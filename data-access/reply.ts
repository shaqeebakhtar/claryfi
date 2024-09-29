export const postReply = async ({
  slug,
  feedbackId,
  content,
  replyTo,
  commentId,
}: {
  slug: string;
  feedbackId: string;
  content: string;
  replyTo: string;
  commentId: string;
}) => {
  const res = await fetch(
    `/api/boards/${slug}/feedback/${feedbackId}/comment/${commentId}/reply`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
        replyTo,
      }),
    }
  );

  if (res.status === 401) {
    throw new Error('You must need to be logged in to reply.');
  }

  if (!res.ok) {
    throw new Error('Failed to post the reply');
  }

  return await res.json();
};

export const deleteReply = async ({
  slug,
  feedbackId,
  commentId,
  replyId,
}: {
  slug: string;
  feedbackId: string;
  commentId: string;
  replyId: string;
}) => {
  const res = await fetch(
    `/api/boards/${slug}/feedback/${feedbackId}/comment/${commentId}/reply/${replyId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!res.ok) {
    throw new Error('Failed to delete the reply');
  }

  return await res.json();
};
