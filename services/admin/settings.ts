import { Board } from '@prisma/client';

export const getBoardMetaDataBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<Board> => {
  const res = await fetch(`/api/admin/board/${slug}/settings`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const { board } = await res.json();

  return board;
};

export const updateBoardMetaData = async ({
  slug,
  name,
  newSlug,
  websiteUrl,
  brandColor,
  hideBranding,
}: {
  slug: string;
  name?: string;
  newSlug?: string;
  websiteUrl?: string;
  hideBranding?: boolean;
  brandColor?: string;
}): Promise<Board> => {
  const res = await fetch(`/api/admin/board/${slug}/settings`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      slug: newSlug,
      url: websiteUrl,
      hide_branding: hideBranding,
      color: brandColor,
    }),
  });

  const { board } = await res.json();

  return board;
};
