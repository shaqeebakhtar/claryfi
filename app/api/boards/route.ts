import { feedbackSchema } from '@/validations/feedback';

export const POST = async (req: Request) => {
  const body = await req.json();

  const validateFields = feedbackSchema.safeParse(body);

  if (!validateFields.success) {
    return Response.json({ message: 'Invalid Fields' }, { status: 400 });
  }

  const { title, description } = validateFields.data;
};
