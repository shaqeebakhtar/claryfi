import { z } from 'zod';

export const settingsFormSchema = z.object({
  logo: z.string().optional(),
  name: z.string({
    required_error: 'Please set a memorable name of your board.',
  }),
  url: z.string().url().optional(),
  slug: z.string({
    required_error: 'Please choose a unique slug for your board.',
  }),
  color: z.string({
    required_error: 'Please select a color.',
  }),
  hide_branding: z.boolean().default(false).optional(),
});
