import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

export const DELETE = async (
  req: Request,
  {
    params,
  }: {
    params: {
      slug: string;
      feedbackId: string;
      commentId: string;
      replyId: string;
    };
  }
) => {
  const { slug, feedbackId, commentId, replyId } = params;
  const { userId } = auth();

  if (!userId) {
    return Response.json('Unauthorized', { status: 401 });
  }

  const board = await db.board.findUnique({
    where: {
      slug,
    },
  });

  if (!board) {
    return Response.json('Board not found', { status: 404 });
  }

  const feedback = await db.feedback.findUnique({
    where: {
      id: feedbackId,
    },
  });

  if (!feedback) {
    return new Response('Feedback not found', { status: 404 });
  }

  const reply = await db.reply.findUnique({
    where: {
      id: replyId,
    },
  });

  if (!reply) {
    return new Response('Reply not found', { status: 404 });
  }

  let deletedReply = null;

  try {
    deletedReply = await db.reply.delete({
      where: {
        id: replyId,
        userId,
      },
    });
  } catch (error) {
    throw new Error('Failed to delete the reply');
  }

  return Response.json({ deletedReply }, { status: 200 });
};
