import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

export const POST = async (
  req: Request,
  { params }: { params: { slug: string; feedbackId: string } }
) => {
  const session = await auth();

  if (!session?.user.id) {
    return Response.json('Unauthorized', { status: 401 });
  }

  const board = await db.board.findUnique({
    where: {
      slug: params.slug,
    },
  });

  if (!board) {
    return new Response('Board not found', { status: 404 });
  }

  const upvoted = await db.upvote.create({
    data: {
      upvoterId: session.user.id,
      upvotedFeedbackId: params.feedbackId,
    },
    include: {
      upvotedFeedback: true,
    },
  });

  return Response.json({ upvoted }, { status: 200 });
};

export const DELETE = async (
  req: Request,
  { params }: { params: { slug: string; feedbackId: string } }
) => {
  const session = await auth();

  if (!session?.user.id) {
    return Response.json('Unauthorized', { status: 401 });
  }

  const board = await db.board.findUnique({
    where: {
      slug: params.slug,
    },
  });

  if (!board) {
    return new Response('Board not found', { status: 404 });
  }

  const unvoted = await db.upvote.delete({
    where: {
      upvoterId_upvotedFeedbackId: {
        upvoterId: session.user.id,
        upvotedFeedbackId: params.feedbackId,
      },
    },
  });

  return Response.json({ unvoted }, { status: 200 });
};
