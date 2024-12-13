import { IFeedback } from '@/types/feedback';

export const addPublicFeedback = async ({
  slug,
  title,
  description,
  name,
  email,
}: {
  slug: string;
  title: string;
  description: string;
  name: string;
  email: string;
}): Promise<{
  id: string;
}> => {
  const res = await fetch(`/api/open/board/${slug}/feedback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      description,
      name,
      email,
    }),
  });

  const { id } = await res.json();

  return id;
};

export const getFeedbackById = async ({
  slug,
  feedbackId,
}: {
  slug: string;
  feedbackId: string;
}): Promise<IFeedback> => {
  const res = await fetch(`/api/open/board/${slug}/feedback/${feedbackId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const { feedback } = await res.json();

  return feedback;
};
