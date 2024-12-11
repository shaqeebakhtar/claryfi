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

export const updateTag = async ({
  slug,
  tagId,
  name,
  color,
}: {
  slug: string;
  tagId: string;
  name: string;
  color: string;
}) => {
  const res = await fetch(`/api/admin/board/${slug}/tag/${tagId}`, {
    method: 'PATCH',
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

export const deleteTagById = async ({
  slug,
  tagId,
}: {
  slug: string;
  tagId: string;
}) => {
  const res = await fetch(`/api/admin/board/${slug}/tag/${tagId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const { id } = await res.json();

  return id;
};
