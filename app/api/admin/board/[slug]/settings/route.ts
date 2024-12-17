import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { settingsFormSchema } from '@/validations/settings';

export const GET = async (
  req: Request,
  { params }: { params: { slug: string } }
) => {
  const { slug } = params;

  const session = await auth();

  if (!session?.user?.id) {
    return Response.json('Unauthorized', { status: 401 });
  }

  const board = await db.board.findUnique({
    where: {
      slug,
      userId: session?.user?.id,
    },
  });

  return Response.json({ board }, { status: 200 });
};

export const PATCH = async (
  req: Request,
  { params }: { params: { slug: string } }
) => {
  const body = await req.json();
  const currSlug = params.slug;

  const session = await auth();

  if (!session?.user?.id) {
    return Response.json('Unauthorized', { status: 401 });
  }

  const validateFields = settingsFormSchema
    .pick({
      logo: true,
      name: true,
      slug: true,
      url: true,
      color: true,
      hide_branding: true,
    })
    .partial()
    .safeParse(body);

  if (!validateFields.success) {
    return Response.json({ error: 'Invalid Fields' }, { status: 400 });
  }

  const {
    logo,
    name,
    slug: newSlug,
    url,
    color,
    hide_branding,
  } = validateFields.data;

  let board = null;

  try {
    board = await db.board.update({
      where: {
        slug: currSlug,
      },
      data: {
        logoUrl: logo,
        name,
        slug: newSlug,
        websiteUrl: url,
        brandColor: color,
        hideBranding: hide_branding,
      },
    });
  } catch (error) {
    throw new Error('Failed to update the board');
  }

  return Response.json(
    { board },
    {
      status: 200,
    }
  );
};
