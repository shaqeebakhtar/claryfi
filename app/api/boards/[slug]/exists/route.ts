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

  if (board) {
    return Response.json(
      {
        slug,
        available: false,
        message: 'Slug already taken.',
      },
      { status: 200 }
    );
  } else {
    return Response.json(
      {
        slug,
        available: true,
      },
      { status: 200 }
    );
  }
};
