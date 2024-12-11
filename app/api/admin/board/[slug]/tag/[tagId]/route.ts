import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { tagSchema } from '@/validations/tag';

export const PATCH = async (
  req: Request,
  { params }: { params: { slug: string; tagId: string } }
) => {
  const body = await req.json();
  const { tagId } = params;
  const session = await auth();

  if (!session?.user.id) {
    return Response.json('Unauthorized', { status: 401 });
  }

  const validateFields = tagSchema.safeParse(body);

  if (!validateFields.success) {
    return Response.json('Invalid fields', { status: 400 });
  }

  const { name, color } = validateFields.data;

  let tag = null;

  try {
    tag = await db.tag.update({
      where: {
        id: tagId,
      },
      data: {
        name,
        color,
      },
    });
  } catch (error) {
    return new Response('Failed to update the tag', { status: 500 });
  }

  return Response.json(
    { id: tag.id },
    {
      status: 200,
    }
  );
};

export const DELETE = async (
  req: Request,
  { params }: { params: { slug: string; tagId: string } }
) => {
  const { tagId } = params;
  const session = await auth();

  if (!session?.user.id) {
    return Response.json('Unauthorized', { status: 401 });
  }

  let tags = null;

  try {
    tags = await db.tag.delete({
      where: {
        id: tagId,
      },
    });
  } catch (error) {
    return new Response('Failed to delete tags', { status: 500 });
  }

  return Response.json(
    { tags },
    {
      status: 200,
    }
  );
};
