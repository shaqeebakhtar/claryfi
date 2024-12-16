import { z } from 'zod';

export const postCommentSchema = z.object({
  comment: z.string(),
});
