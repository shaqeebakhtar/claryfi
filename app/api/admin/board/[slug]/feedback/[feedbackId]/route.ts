import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { feedbackSchema } from '@/validations/feedback';

export const GET = async (
  req: Request,
  { params }: { params: { slug: string; feedbackId: string } }
) => {
  const { slug, feedbackId } = params;

  const session = await auth();

  if (!session?.user?.id) {
    return Response.json('Unauthorized', { status: 401 });
  }

  const board = await db.board.findUnique({
    where: {
      slug,
      userId: session?.user?.id,
    },
  });

  if (!board) {
    return Response.json('Board not found', { status: 404 });
  }

  let feedback;

  try {
    feedback = await db.feedback.findFirst({
      where: {
        id: feedbackId,
        boardId: board.id,
      },
      include: {
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
    throw new Error('Failed to get the feedback');
  }

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

  const session = await auth();

  if (!session?.user?.id) {
    return Response.json('Unauthorized', { status: 401 });
  }

  const validateFields = feedbackSchema
    .pick({
      title: true,
      description: true,
      status: true,
      tagIds: true,
    })
    .partial()
    .safeParse(body);

  if (!validateFields.success) {
    return Response.json({ error: 'Invalid Fields' }, { status: 400 });
  }

  const { title, description, status, tagIds } = validateFields.data;

  const board = await db.board.findUnique({
    where: {
      slug,
      userId: session?.user?.id,
    },
  });

  if (!board) {
    return Response.json('Board not found', { status: 404 });
  }

  let feedback;

  try {
    feedback = await db.feedback.update({
      where: {
        id: feedbackId,
      },
      data: {
        title,
        description,
        status,
        tags: {
          deleteMany: {},
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
    throw new Error('Failed to update the feedback');
  }

  return Response.json(
    { id: feedback.id },
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

  const session = await auth();

  if (!session?.user?.id) {
    return Response.json('Unauthorized', { status: 401 });
  }

  const board = await db.board.findUnique({
    where: {
      slug,
      userId: session?.user?.id,
    },
  });

  if (!board) {
    return Response.json('Board not found', { status: 404 });
  }

  let feedback;

  try {
    feedback = await db.feedback.delete({
      where: {
        id: feedbackId,
      },
    });
  } catch (error) {
    throw new Error('Failed to update the feedback');
  }

  return Response.json(
    { id: feedback.id },
    {
      status: 200,
    }
  );
};
