import { db } from '@/lib/db';
import { publicFeedbackSchema } from '@/validations/feedback';

export const POST = async (
  req: Request,
  { params }: { params: { slug: string } }
) => {
  const body = await req.json();
  const slug = params.slug;

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

  const { title, description, name, email } = validateFields.data;

  let createdFeedback = null;

  try {
    createdFeedback = await db.feedback.create({
      data: {
        boardId: board.id,
        title,
        description,
        submitterName: name,
        submitterEmail: email,
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
