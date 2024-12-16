import { boardSchema } from '@/validations/board';
import { db } from '@/lib/db';
import { auth } from '@/lib/auth';

export const POST = async (req: Request) => {
  const body = await req.json();

  const session = await auth();

  if (!session?.user.id) {
    return Response.json('Unauthorized', { status: 401 });
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
        userId: session?.user.id,
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
  const session = await auth();

  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  const boards = await db.board.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      _count: {
        select: {
          feedbacks: true,
        },
      },
    },
  });

  const boardsDTO = boards.map((board) => ({
    id: board.id,
    name: board.name,
    slug: board.slug,
    _count: board._count,
  }));

  return Response.json({ boards: boardsDTO }, { status: 200 });
};
