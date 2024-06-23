import { db } from '@/lib/db';

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);

  const slug = searchParams.get('slug');

  if (!slug) {
    return Response.json(
      { error: 'Missing slug query parameter' },
      { status: 400 }
    );
  }

  const slugExists = await db.board.findUnique({
    where: {
      slug,
    },
  });

  if (slugExists) {
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
