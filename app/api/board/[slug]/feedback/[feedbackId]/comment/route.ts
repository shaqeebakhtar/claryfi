import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

export const POST = async (
  req: Request,
  { params }: { params: { slug: string; feedbackId: string } }
) => {
  const { slug, feedbackId } = params;
  const session = await auth();

  const body = await req.json();
  const { content } = body;

  if (!session?.user.id) {
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
    comment = await db.comment.create({
      data: {
        feedbackId,
        content,
        userId: session.user.id,
      },
    });
  } catch (error) {
    throw new Error('Failed to comment');
  }

  return Response.json({ comment }, { status: 200 });
};

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

  const comments = await db.comment.findMany({
    where: {
      feedbackId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: true,
    },
  });

  return Response.json({ comments }, { status: 200 });
};
