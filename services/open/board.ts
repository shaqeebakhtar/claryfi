import { Board, Feedback } from '@prisma/client';

interface IFeedback extends Feedback {
  _count: {
    upvotes: number;
    comments: number;
  };
}

export const getPublicBoardBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<
  Board & {
    feedbacks: IFeedback[];
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
