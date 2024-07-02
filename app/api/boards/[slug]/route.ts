import { db } from '@/lib/db';
import { boardSchema } from '@/validations/board';
import { auth } from '@clerk/nextjs/server';

export const GET = async (
  req: Request,
  { params }: { params: { slug: string } }
) => {
  const slug = params.slug;

  const { userId } = auth();

  if (!userId) {
    return Response.json('Unauthorized', { status: 401 });
  }

  const board = await db.board.findUnique({
    where: {
      slug,
    },
  });

  return Response.json({ board }, { status: 200 });
};

export const PATCH = async (
  req: Request,
  { params }: { params: { slug: string } }
) => {
  const body = await req.json();

  const currSlug = params.slug;

  const validateFields = boardSchema
    .pick({ name: true, slug: true })
    .partial()
    .safeParse(body);

  if (!validateFields.success) {
    return Response.json({ error: 'Invalid Fields' }, { status: 400 });
  }

  const { name, slug: newSlug } = validateFields.data;

  let updatedBoard = null;

  try {
    updatedBoard = await db.board.update({
      where: {
        slug: currSlug,
      },
      data: {
        name,
        slug: newSlug,
      },
    });
  } catch (error) {
    throw new Error('Failed to update the board');
  }

  return Response.json(
    { updatedBoard },
    {
      status: 200,
    }
  );
};
