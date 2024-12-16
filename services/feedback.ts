export const upvoteFeedback = async ({
  slug,
  feedbackId,
}: {
  slug: string;
  feedbackId: string;
}) => {
  const res = await fetch(`/api/board/${slug}/feedback/${feedbackId}/upvote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const { upvoted } = await res.json();

  return !!upvoted;
};

export const undovoteFeedback = async ({
  slug,
  feedbackId,
}: {
  slug: string;
  feedbackId: string;
}) => {
  const res = await fetch(`/api/board/${slug}/feedback/${feedbackId}/upvote`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const { unvoted } = await res.json();

  return !!unvoted;
};
