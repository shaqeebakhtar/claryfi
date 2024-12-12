import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { tagSchema } from '@/validations/tag';

export const POST = async (
  req: Request,
  { params }: { params: { slug: string } }
) => {
  const body = await req.json();
  const slug = params.slug;
  const session = await auth();

  if (!session?.user.id) {
    return Response.json('Unauthorized', { status: 401 });
  }

  const validateFields = tagSchema.safeParse(body);

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

  const { name, color } = validateFields.data;

  let tag = null;

  try {
    tag = await db.tag.create({
      data: {
        boardId: board.id,
        name,
        color,
      },
    });
  } catch (error) {
    return new Response('Failed to create tag', { status: 500 });
  }

  return Response.json(
    { id: tag.id },
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

  let tags = null;

  try {
    tags = await db.tag.findMany({
      where: {
        boardId: board.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        _count: {
          select: {
            feedbacks: true,
          },
        },
      },
    });
  } catch (error) {
    return new Response('Failed to get tags', { status: 500 });
  }

  return Response.json(
    { tags },
    {
      status: 200,
    }
  );
};
