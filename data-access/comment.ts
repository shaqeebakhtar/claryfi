export const postComment = async ({
  slug,
  feedbackId,
  content,
}: {
  slug: string;
  feedbackId: string;
  content: string;
}) => {
  const res = await fetch(
    `/api/boards/${slug}/feedback/${feedbackId}/comment`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
      }),
    }
  );

  if (!res.ok) {
    throw new Error('Failed to post the comment');
  }

  return await res.json();
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

  if (!res.ok) {
    throw new Error('Failed to post the comment');
  }

  return await res.json();
};

export const getCommentsByFeedbackId = async ({
  slug,
  feedbackId,
}: {
  slug: string;
  feedbackId: string;
}) => {
  const res = await fetch(
    `/api/boards/${slug}/feedback/${feedbackId}/comment`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const { comments } = await res.json();

  return comments;
};
