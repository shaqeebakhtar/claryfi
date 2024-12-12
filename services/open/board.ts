import { Board, Feedback, TagOnPosts } from '@prisma/client';

interface ITagOnPosts extends TagOnPosts {
  tag: {
    name: string;
    color: string;
  };
}

interface IFeedback extends Feedback {
  _count: {
    upvotes: number;
    comments: number;
  };
  tags: ITagOnPosts[];
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
