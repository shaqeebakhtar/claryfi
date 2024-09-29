import { feedbackSchema } from '@/validations/feedback';
import { db } from '@/lib/db';
import { auth } from '@/lib/auth';

export const POST = async (
  req: Request,
  { params }: { params: { slug: string } }
) => {
  const body = await req.json();
  const slug = params.slug;
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json('Unauthorized', { status: 401 });
  }

  const validateFields = feedbackSchema.safeParse(body);

  if (!validateFields.success) {
    return Response.json({ error: 'Invalid Fields' }, { status: 400 });
  }

  const board = await db.board.findUnique({
    where: {
      slug,
    },
  });

  if (!board) {
    return new Response('Board not found', { status: 404 });
  }

  const { title, description } = validateFields.data;

  let createdFeedback = null;

  try {
    createdFeedback = await db.feedback.create({
      data: {
        boardId: board.id,
        title,
        description,
        submittedBy: session.user.id,
      },
    });
  } catch (error) {
    throw new Error('Failed to submit your feedback');
  }

  return Response.json(
    { createdFeedback },
    {
      status: 200,
    }
  );
};

export const GET = async (
  req: Request,
  { params }: { params: { slug: string } }
) => {
  const slug = params.slug;

  const board = await db.board.findUnique({
    where: {
      slug,
    },
  });

  if (!board) {
    return new Response('Board not found', { status: 404 });
  }

  const feedbacks = await db.feedback.findMany({
    where: {
      boardId: board.id,
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
          comments: true,
        },
      },
    },
    orderBy: [
      {
        upvotes: {
          _count: 'asc',
        },
      },
    ],
  });

  return Response.json({ feedbacks }, { status: 200 });
};
