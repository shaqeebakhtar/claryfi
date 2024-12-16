import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { boardSchema } from '@/validations/board';

export const GET = async (
  req: Request,
  { params }: { params: { slug: string } }
) => {
  const slug = params.slug;

  const session = await auth();

  if (!session?.user?.id) {
    return Response.json('Unauthorized', { status: 401 });
  }

  const board = await db.board.findUnique({
    where: {
      slug,
      userId: session?.user?.id,
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

export const DELETE = async (
  req: Request,
  { params }: { params: { slug: string } }
) => {
  const slug = params.slug;

  const session = await auth();

  if (!session?.user?.id) {
    return Response.json('Unauthorized', { status: 401 });
  }

  let deletedBoard = null;

  try {
    deletedBoard = await db.board.delete({
      where: {
        slug_userId: {
          slug,
          userId: session?.user.id,
        },
      },
    });
  } catch (error) {
    throw new Error('Failed to delete the board');
  }

  return Response.json(
    { deletedBoard },
    {
      status: 200,
    }
  );
};
