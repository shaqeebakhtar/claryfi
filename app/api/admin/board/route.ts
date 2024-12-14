import { boardSchema } from '@/validations/board';
import { db } from '@/lib/db';
import { auth } from '@/lib/auth';

export const POST = async (req: Request) => {
  const body = await req.json();

  const session = await auth();

  if (!session?.user.id) {
    return Response.json('Unauthorized', { status: 401 });
  }

  const validateFields = boardSchema.safeParse(body);

  if (!validateFields.success) {
    return Response.json({ error: 'Invalid Fields' }, { status: 400 });
  }

  const { name, slug, url } = validateFields.data;

  let board = null;

  try {
    board = await db.board.create({
      data: {
        userId: session?.user.id,
        name,
        slug,
        websiteUrl: url,
      },
    });
  } catch (error) {
    throw new Error('Failed to create the board');
  }

  return Response.json(
    { board },
    {
      status: 200,
    }
  );
};
