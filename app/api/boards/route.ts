import { boardSchema } from '@/validations/board';
import { db } from '@/lib/db';

export const POST = async (req: Request) => {
  const body = await req.json();

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
  const boards = await db.board.findMany();

  return Response.json({ boards }, { status: 200 });
};
