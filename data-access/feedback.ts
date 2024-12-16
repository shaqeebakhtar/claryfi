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

  if (res.status === 401) {
    throw new Error('You must need to be logged in to add feedbacks.');
  }

  if (!res.ok) {
    throw new Error('Failed to create feedback');
  }

  return await res.json();
};

export const getFeedbacksByBoardSlug = async ({
  slug,
  sortBy,
}: {
  slug: string;
  sortBy: string;
}) => {
  const res = await fetch(`/api/boards/${slug}/feedback?sortBy=${sortBy}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const { feedbacks } = await res.json();

  return feedbacks;
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

export const updateFeedback = async ({
  slug,
  feedbackId,
  status,
  title,
  description,
}: {
  slug: string;
  feedbackId: string;
  status?: string;
  title?: string;
  description?: string;
}) => {
  const res = await fetch(`/api/boards/${slug}/feedback/${feedbackId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      status,
      title,
      description,
    }),
  });

  const { updatedFeedback } = await res.json();

  return updatedFeedback;
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

export const getFeedbackById = async ({
  slug,
  feedbackId,
}: {
  slug: string;
  feedbackId: string;
}) => {
  const res = await fetch(`/api/boards/${slug}/feedback/${feedbackId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const { feedback } = await res.json();

  return feedback;
};
