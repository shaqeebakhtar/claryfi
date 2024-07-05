import { db } from '@/lib/db';

export const GET = async (
  req: Request,
  { params }: { params: { slug: string } }
) => {
  const slug = params.slug;

  const board = await db.board.findUnique({
    where: {
      slug,
    },
  });

  return Response.json({ board }, { status: 200 });
};
