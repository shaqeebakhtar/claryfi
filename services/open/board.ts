import { Board, Feedback } from '@prisma/client';

export const getPublicBoardBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<
  Board & {
    feedbacks: Feedback[];
  }
> => {
  const res = await fetch(`/api/open/board/${slug}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const { board } = await res.json();

  return board;
};
