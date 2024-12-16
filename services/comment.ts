export const postComment = async ({
  slug,
  feedbackId,
  content,
}: {
  slug: string;
  feedbackId: string;
  content: string;
}) => {
  const res = await fetch(`/api/board/${slug}/feedback/${feedbackId}/comment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content,
    }),
  });

  const { comment } = await res.json();

  return comment;
};

export const deleteComment = async ({
  slug,
  feedbackId,
  commentId,
}: {
  slug: string;
  feedbackId: string;
  commentId: string;
}) => {
  const res = await fetch(
    `/api/boards/${slug}/feedback/${feedbackId}/comment/${commentId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return await res.json();
};
