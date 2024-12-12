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
