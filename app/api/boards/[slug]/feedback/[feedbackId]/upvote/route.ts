import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

export const GET = async (
  req: Request,
  { params }: { params: { slug: string; feedbackId: string } }
) => {
  const { userId } = auth();

  if (!userId) {
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

  const hasUpvoted = await db.upvote.findUnique({
    where: {
      upvoterId_upvotedFeedbackId: {
        upvoterId: userId,
        upvotedFeedbackId: params.feedbackId,
      },
    },
  });

  return Response.json({ hasUpvoted }, { status: 200 });
};

export const POST = async (
  req: Request,
  { params }: { params: { slug: string; feedbackId: string } }
) => {
  const { userId } = auth();

  if (!userId) {
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
      upvoterId: userId,
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
  const { userId } = auth();

  if (!userId) {
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
        upvoterId: userId,
        upvotedFeedbackId: params.feedbackId,
      },
    },
    include: {
      upvotedFeedback: true,
    },
  });

  return Response.json({ unvoted }, { status: 200 });
};
