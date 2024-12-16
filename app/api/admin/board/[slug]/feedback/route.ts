import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { feedbackSchema } from '@/validations/feedback';

export const POST = async (
  req: Request,
  { params }: { params: { slug: string } }
) => {
  const body = await req.json();
  const { slug } = params;
  const session = await auth();

  if (!session?.user.id) {
    return Response.json('Unauthorized', { status: 401 });
  }

  const validateFields = feedbackSchema.safeParse(body);

  if (!validateFields.success) {
    return Response.json('Invalid fields', { status: 400 });
  }

  const board = await db.board.findUnique({
    where: {
      slug,
      userId: session.user.id,
    },
  });

  if (!board) {
    return new Response('Board not found', { status: 404 });
  }

  const { title, description, status, tagIds } = validateFields.data;

  let feedback = null;

  try {
    feedback = await db.feedback.create({
      data: {
        boardId: board.id,
        title,
        description,
        status,
        userId: session.user.id,
        tags: {
          create: tagIds?.map((id) => ({
            tag: {
              connect: {
                id,
              },
            },
          })),
        },
      },
    });
  } catch (error) {
    return new Response('Failed to create tag', { status: 500 });
  }

  return Response.json(
    { id: feedback.id },
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
  const session = await auth();

  if (!session?.user.id) {
    return Response.json('Unauthorized', { status: 401 });
  }

  const board = await db.board.findUnique({
    where: {
      slug,
      userId: session.user.id,
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
