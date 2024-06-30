import { boardSchema } from '@/validations/board';
import { z } from 'zod';

export const createBoard = async ({
  name,
  slug,
}: z.infer<typeof boardSchema>) => {
  const res = await fetch('/api/boards', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      slug,
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to create monitor');
  }

  return await res.json();
};

export const checkSlugExists = async ({ slug }: { slug: string }) => {
  const res = await fetch(`/api/boards/${slug}/exists`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return await res.json();
};

export const getBoards = async () => {
  const res = await fetch('/api/boards', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const { boards } = await res.json();

  return boards;
};

export const getBoardBySlug = async ({ slug }: { slug: string }) => {
  const res = await fetch(`/api/boards/${slug}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const { board } = await res.json();

  return board;
};

export const getBoardNameBySlug = async ({ slug }: { slug: string }) => {
  const res = await fetch(`/api/boards/${slug}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const { board } = await res.json();

  return { name: board.name };
};
