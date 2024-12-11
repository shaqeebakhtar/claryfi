import { Tag } from '@prisma/client';

export const createTag = async ({
  slug,
  name,
  color,
}: {
  slug: string;
  name: string;
  color: string;
}) => {
  const res = await fetch(`/api/admin/board/${slug}/tag`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      color,
    }),
  });

  const { id } = await res.json();

  return id;
};

export const getTagsByBoardSlug = async (slug: string): Promise<Tag[]> => {
  const res = await fetch(`/api/admin/board/${slug}/tag`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const { tags } = await res.json();

  return tags;
};
