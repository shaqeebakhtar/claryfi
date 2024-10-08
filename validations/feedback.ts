import { z } from 'zod';

export const feedbackSchema = z.object({
  title: z.string().min(5, {
    message: 'Title must be at least 5 characters.',
  }),
  description: z.string().min(5, {
    message: 'Details must be at least 5 characters.',
  }),
  status: z.enum(['NEW', 'CANCELLED', 'IN_PROGRESS', 'LIVE']).optional(),
});
