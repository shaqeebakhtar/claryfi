import { db } from '@/lib/db';
import { feedbackSchema } from '@/validations/feedback';
import { auth } from '@clerk/nextjs/server';

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
      upvotes: {
        select: {
          upvotedFeedbackId: true,
          upvoterId: true,
        },
      },
      _count: {
        select: {
          upvotes: true,
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

export const PATCH = async (
  req: Request,
  { params }: { params: { slug: string; feedbackId: string } }
) => {
  const body = await req.json();
  const { slug, feedbackId } = params;

  const { userId } = auth();

  if (!userId) {
    return Response.json('Unauthorized', { status: 401 });
  }

  const validateFields = feedbackSchema
    .pick({ status: true, title: true, description: true })
    .partial()
    .safeParse(body);

  if (!validateFields.success) {
    return Response.json({ error: 'Invalid Fields' }, { status: 400 });
  }

  const { status, title, description } = validateFields.data;

  let updatedFeedback = null;

  const board = await db.board.findUnique({
    where: {
      slug,
    },
  });

  if (!board) {
    return Response.json('Board not found', { status: 404 });
  }

  const isAdmin = board.userId === userId;

  try {
    if (status && isAdmin) {
      updatedFeedback = await db.feedback.update({
        where: {
          id: feedbackId,
        },
        data: {
          status,
        },
      });
    } else if (!status) {
      updatedFeedback = await db.feedback.update({
        where: {
          id: feedbackId,
          submittedBy: userId,
        },
        data: {
          title,
          description,
        },
      });
    }
  } catch (error) {
    throw new Error("You can't update this feedback");
  }

  return Response.json(
    { updatedFeedback },
    {
      status: 200,
    }
  );
};

export const DELETE = async (
  req: Request,
  { params }: { params: { slug: string; feedbackId: string } }
) => {
  const { slug, feedbackId } = params;

  const { userId } = auth();

  if (!userId) {
    return Response.json('Unauthorized', { status: 401 });
  }

  const board = await db.board.findUnique({
    where: {
      slug_userId: {
        slug,
        userId,
      },
    },
  });

  const isAdmin = !!board;

  let deletedFeedback = null;

  try {
    if (isAdmin) {
      deletedFeedback = await db.feedback.delete({
        where: {
          id: feedbackId,
        },
      });
    } else {
      deletedFeedback = await db.feedback.delete({
        where: {
          id: feedbackId,
          submittedBy: userId,
        },
      });
    }
  } catch (error) {
    throw new Error("You can't delete this feedback");
  }

  return Response.json(
    { deletedFeedback },
    {
      status: 200,
    }
  );
};
