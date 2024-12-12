import { Tags } from 'lucide-react';
import { z } from 'zod';

export const feedbackSchema = z.object({
  title: z.string().min(5, {
    message: 'Title must be at least 5 characters.',
  }),
  description: z.string().min(5, {
    message: 'Details must be at least 5 characters.',
  }),
  status: z
    .enum(['PENDING', 'APPROVED', 'CANCELLED', 'IN_PROGRESS', 'DONE'])
    .default('APPROVED'),
  tagIds: z.string().array().optional(),
});

export const publicFeedbackSchema = z.object({
  title: z.string().min(5, {
    message: 'Title must be at least 5 characters.',
  }),
  description: z.string().min(5, {
    message: 'Details must be at least 5 characters.',
  }),
  name: z.string({ required_error: 'Your name is required' }),
  email: z
    .string({ required_error: 'Your email is required' })
    .email({ message: 'Please enter a valid email' }),
});
