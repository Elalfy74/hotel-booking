import { z } from 'zod';

import { imageSchema } from '@/lib/utils';

export const createCountrySchema = z.object({
  name: z.string().min(2).max(255),
  image: imageSchema,
  isFeatured: z.boolean().default(false),
});
export type CreateCountryType = z.infer<typeof createCountrySchema>;
