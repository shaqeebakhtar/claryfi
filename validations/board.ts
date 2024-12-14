import { z } from 'zod';

export const boardSchema = z.object({
  name: z.string({ required_error: 'Board name is required' }).min(2, {
    message: 'Board name must be at least 2 characters.',
  }),
  url: z.string().url().optional(),
  slug: z
    .string({
      required_error: 'Slug is required',
    })
    .min(2, {
      message: 'Slug must be at least 2 characters.',
    })
    .max(16, {
      message: 'Slug must be at under 16 characters.',
    })
    .refine(
      (value) => /^[a-zA-Z0-9\-]+$/.test(value ?? ''),
      'Slug must only contain alphabets, numbers and "-" symbol'
    ),
});
