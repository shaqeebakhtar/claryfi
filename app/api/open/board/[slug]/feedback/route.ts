import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { publicFeedbackSchema } from '@/validations/feedback';

export const POST = async (
  req: Request,
  { params }: { params: { slug: string } }
) => {
  const body = await req.json();
  const slug = params.slug;
  const session = await auth();

  if (!session?.user) {
    return Response.json('Unauthorized', { status: 401 });
  }

  const validateFields = publicFeedbackSchema.safeParse(body);

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
        userId: session?.user.id,
        upvotes: {
          create: {
            upvoterId: session?.user.id,
          },
        },
      },
    });
  } catch (error) {
    return new Response('Failed to submit your feedback', { status: 404 });
  }

  return Response.json(
    { id: createdFeedback.id },
    {
      status: 200,
    }
  );
};

export const GET = async (
  req: Request,
  { params }: { params: { slug: string } }
) => {
  const { slug } = params;

  const board = await db.board.findUnique({
    where: {
      slug,
    },
  });

  if (!board) {
    return new Response('Board not found', { status: 404 });
  }

  let feedbacks;

  try {
    feedbacks = await db.feedback.findMany({
      where: {
        boardId: board.id,
      },
      include: {
        _count: {
          select: {
            upvotes: true,
            comments: true,
          },
        },
        upvotes: true,
        comments: true,
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
  } catch (error) {
    return Response.json(
      { message: 'Error getting feedbacks' },
      { status: 500 }
    );
  }

  return Response.json({ feedbacks }, { status: 200 });
};
