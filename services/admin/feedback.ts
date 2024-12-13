import { IFeedback } from '@/types/feedback';

export const addFeedback = async ({
  slug,
  title,
  description,
  status,
  tagIds,
}: {
  slug: string;
  title: string;
  description: string;
  status: string;
  tagIds: string[];
}) => {
  const res = await fetch(`/api/admin/board/${slug}/feedback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      description,
      status,
      tagIds,
    }),
  });

  const { id } = await res.json();

  return id;
};

export const getFeedbacks = async ({
  slug,
}: {
  slug: string;
}): Promise<IFeedback[]> => {
  const res = await fetch(`/api/admin/board/${slug}/feedback`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const { feedbacks } = await res.json();

  return feedbacks;
};

export const updateFeedback = async ({
  slug,
  feedbackId,
  title,
  description,
  status,
  tagIds,
}: {
  slug: string;
  feedbackId: string;
  title?: string;
  description?: string;
  status?: string;
  tagIds?: string[];
}): Promise<{ id: string }> => {
  const res = await fetch(`/api/admin/board/${slug}/feedback/${feedbackId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      description,
      status,
      tagIds,
    }),
  });

  const { id } = await res.json();

  return id;
};

export const deleteFeedbackById = async ({
  slug,
  feedbackId,
}: {
  slug: string;
  feedbackId: string;
}) => {
  const res = await fetch(`/api/admin/board/${slug}/feedback/${feedbackId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const { id } = await res.json();

  return id;
};
