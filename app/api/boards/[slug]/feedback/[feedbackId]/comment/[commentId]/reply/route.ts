import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

export const POST = async (
  req: Request,
  {
    params,
  }: { params: { slug: string; feedbackId: string; commentId: string } }
) => {
  const { slug, feedbackId, commentId } = params;
  const session = await auth();

  const body = await req.json();
  const { content, replyTo } = body;

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

  const comment = await db.comment.findUnique({
    where: {
      id: commentId,
    },
  });

  if (!feedback) {
    return new Response('Comment not found', { status: 404 });
  }

  let reply = null;

  try {
    reply = await db.reply.create({
      data: {
        commentId,
        content,
        userId: session.user.id,
        replyTo,
      },
    });
  } catch (error) {
    throw new Error('Failed to comment');
  }

  return Response.json({ reply }, { status: 200 });
};
