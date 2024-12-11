import z from 'zod';

export const tagSchema = z.object({
  name: z
    .string({ required_error: 'Tag name is required' })
    .min(2, { message: 'Tag name must be atleast 2 characters' })
    .max(16, {
      message: 'Tag name can only be maximum of 16 characters',
    }),
  color: z.string(),
});
