type addFeedbackProps = {
  slug: string;
  title: string;
  description: string;
};

export const addFeedback = async ({
  slug,
  title,
  description,
}: addFeedbackProps) => {
  const res = await fetch(`/api/boards/${slug}/feedback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      description,
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to create feedback');
  }

  return await res.json();
};

export const getFeedbacksByBoardSlug = async (slug: string) => {
  const res = await fetch(`/api/boards/${slug}/feedback`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const { feedbacks } = await res.json();

  return feedbacks;
};

export const upvoteFeedback = async ({
  slug,
  feedbackId,
}: {
  slug: string;
  feedbackId: string;
}) => {
  const res = await fetch(`/api/boards/${slug}/feedback/${feedbackId}/upvote`, {
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
  const res = await fetch(`/api/boards/${slug}/feedback/${feedbackId}/upvote`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const { unvoted } = await res.json();

  return !!unvoted;
};

export const deleteFeedback = async ({
  slug,
  feedbackId,
}: {
  slug: string;
  feedbackId: string;
}) => {
  const res = await fetch(`/api/boards/${slug}/feedback/${feedbackId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const { deletedFeedback } = await res.json();

  return deletedFeedback;
};

export const updateFeedbackStatus = async ({
  slug,
  feedbackId,
  status,
}: {
  slug: string;
  feedbackId: string;
  status: string;
}) => {
  const res = await fetch(`/api/boards/${slug}/feedback/${feedbackId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      status,
    }),
  });

  const { updatedFeedback } = await res.json();

  return updatedFeedback;
};
