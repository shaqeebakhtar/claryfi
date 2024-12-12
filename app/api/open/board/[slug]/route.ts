import { db } from '@/lib/db';

export const GET = async (
  req: Request,
  { params }: { params: { slug: string } }
) => {
  const slug = params.slug;

  let board;

  try {
    board = await db.board.findUnique({
      where: {
        slug,
      },
      include: {
        feedbacks: {
          include: {
            _count: {
              select: {
                upvotes: true,
                comments: true,
              },
            },
            tags: {
              include: {
                tag: {
                  select: {
                    name: true,
                    color: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  } catch (error) {
    return Response.json(
      { message: 'Error getting board details' },
      { status: 500 }
    );
  }

  return Response.json({ board }, { status: 200 });
};
