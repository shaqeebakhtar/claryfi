import { Board } from '@prisma/client';

export const createBoard = async ({
  name,
  slug,
  url,
}: {
  name: string;
  slug: string;
  url?: string;
}): Promise<Board> => {
  const res = await fetch('/api/admin/board', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      slug,
      url,
    }),
  });

  const { board } = await res.json();

  return board;
};

export const checkSlugExists = async ({ slug }: { slug: string }) => {
  const res = await fetch(`/api/admin/board/${slug}/exists`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return await res.json();
};

export const getBoards = async (): Promise<Board[]> => {
  const res = await fetch('/api/admin/board', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const { boards } = await res.json();

  return boards;
};

export const getBoardBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<Board> => {
  const res = await fetch(`/api/admin/board/${slug}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const { board } = await res.json();

  return board;
};

export const deleteBoard = async ({ slug }: { slug: string }) => {
  const res = await fetch(`/api/admin/board/${slug}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const { board } = await res.json();

  return board;
};
