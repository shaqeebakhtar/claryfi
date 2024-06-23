import { z } from 'zod';

export const boardSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  slug: z
    .string()
    .min(2, {
      message: 'Slug must be at least 2 characters.',
    })
    .refine(
      (value) => /^[a-zA-Z0-9\-]+$/.test(value ?? ''),
      'Slug must only contain alphabets, numbers and "-" symbol'
    ),
});
