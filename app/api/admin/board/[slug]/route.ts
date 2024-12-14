import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

export const DELETE = async (
  req: Request,
  { params }: { params: { slug: string } }
) => {
  const { slug } = params;
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json('Unauthorized', { status: 401 });
  }

  let board = null;

  try {
    board = await db.board.delete({
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
    { board },
    {
      status: 200,
    }
  );
};
