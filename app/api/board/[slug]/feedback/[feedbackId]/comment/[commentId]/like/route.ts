import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

export const POST = async (
  req: Request,
  {
    params,
  }: { params: { slug: string; feedbackId: string; commentId: string } }
) => {
  const session = await auth();

  if (!session?.user.id) {
    return Response.json('Unauthorized', { status: 401 });
  }

  const comment = await db.comment.findUnique({
    where: {
      id: params.commentId,
    },
  });

  if (!comment) {
    return new Response('Comment not found', { status: 404 });
  }

  const liked = await db.commentLike.create({
    data: {
      likedBy: session.user.id,
      likedCommentId: params.commentId,
    },
    include: {
      likedComment: true,
    },
  });

  return Response.json({ liked }, { status: 200 });
};

export const DELETE = async (
  req: Request,
  {
    params,
  }: { params: { slug: string; feedbackId: string; commentId: string } }
) => {
  const session = await auth();

  if (!session?.user.id) {
    return Response.json('Unauthorized', { status: 401 });
  }

  const comment = await db.comment.findUnique({
    where: {
      id: params.commentId,
    },
  });

  if (!comment) {
    return new Response('Comment not found', { status: 404 });
  }

  const undoLike = await db.commentLike.delete({
    where: {
      likedBy_likedCommentId: {
        likedBy: session.user.id,
        likedCommentId: params.commentId,
      },
    },
  });

  return Response.json({ undoLike }, { status: 200 });
};
