import { z } from 'zod';

export const generalSettingsFormSchema = z.object({
  logo: z
    .instanceof(File, {
      message: 'Please select a image',
    })
    .refine(
      (file) => file.size < 2 * 1024 * 1024,
      'File size must be less than 2MB'
    ),
  name: z.string({
    required_error: 'Please set a memorable name of your board.',
  }),
  slug: z.string({
    required_error: 'Please choose a unique slug for your board.',
  }),
});
