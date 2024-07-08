import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

export const PATCH = async (
  req: Request,
  {
    params,
  }: { params: { slug: string; feedbackId: string; commentId: string } }
) => {
  const { slug, feedbackId, commentId } = params;
  const { userId } = auth();

  const body = await req.json();
  const { content } = body;

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

  const comment = await db.comment.findFirst({
    where: {
      id: commentId,
      userId,
      feedbackId,
    },
  });

  if (!comment) {
    return new Response('Comment not found', { status: 404 });
  }

  let updatedComment = null;

  try {
    updatedComment = await db.comment.update({
      where: {
        id: commentId,
        userId,
        feedbackId,
      },
      data: {
        content,
      },
    });
  } catch (error) {
    throw new Error('Failed to update the comment');
  }

  return Response.json({ updatedComment }, { status: 200 });
};

export const DELETE = async (
  req: Request,
  {
    params,
  }: { params: { slug: string; feedbackId: string; commentId: string } }
) => {
  const { slug, feedbackId, commentId } = params;
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

  let comment = null;

  try {
    comment = await db.comment.delete({
      where: {
        id: commentId,
        userId,
      },
    });
  } catch (error) {
    throw new Error('Failed to delete the comment');
  }

  return Response.json({ comment }, { status: 200 });
};
