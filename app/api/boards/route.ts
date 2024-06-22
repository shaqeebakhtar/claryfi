import { boardSchema } from '@/validations/board';

export const POST = async (req: Request) => {
  const body = await req.json();

  const validateFields = boardSchema.safeParse(body);

  if (!validateFields.success) {
    return Response.json({ message: 'Invalid Fields' }, { status: 400 });
  }

  const { name, slug } = validateFields.data;
};
