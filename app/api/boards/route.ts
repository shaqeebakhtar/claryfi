import { boardSchema } from '@/validations/board';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

export const POST = async (req: Request) => {
  const body = await req.json();

  const { userId } = auth();

  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }

  const validateFields = boardSchema.safeParse(body);

  if (!validateFields.success) {
    return Response.json({ error: 'Invalid Fields' }, { status: 400 });
  }

  const { name, slug } = validateFields.data;

  let createdBoard = null;

  try {
    createdBoard = await db.board.create({
      data: {
        name,
        slug,
        userId,
      },
    });
  } catch (error) {
    throw new Error('Failed to create the board');
  }

  return Response.json(
    { createdBoard },
    {
      status: 200,
    }
  );
};

export const GET = async (req: Request) => {
  const { userId } = auth();

  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }

  const boards = await db.board.findMany({
    where: {
      userId,
    },
  });

  return Response.json({ boards }, { status: 200 });
};
