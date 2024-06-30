import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

export const GET = async (
  req: Request,
  { params }: { params: { slug: string } }
) => {
  const { userId } = auth();

  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }

  const slug = params.slug;

  const board = await db.board.findUnique({
    where: {
      slug_userId: {
        slug,
        userId,
      },
    },
  });

  return Response.json({ board }, { status: 200 });
};
