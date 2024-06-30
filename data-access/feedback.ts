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
    throw new Error('Failed to create monitor');
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
