import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { feedbackSchema } from '@/validations/feedback';
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
