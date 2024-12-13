import { db } from '@/lib/db';

export const GET = async (
  req: Request,
  { params }: { params: { slug: string; feedbackId: string } }
) => {
  const { slug, feedbackId } = params;

  const board = await db.board.findUnique({
    where: {
      slug,
    },
  });

  if (!board) {
    return Response.json({ error: 'Board not found' }, { status: 404 });
  }

  const feedback = await db.feedback.findFirst({
    where: {
      id: feedbackId,
    },
    include: {
      _count: {
        select: {
          upvotes: true,
          comments: true,
        },
      },
      tags: {
        include: {
          tag: {
            select: {
              name: true,
              color: true,
            },
          },
        },
      },
    },
  });

  return Response.json(
    { feedback },
    {
      status: 200,
    }
  );
};
