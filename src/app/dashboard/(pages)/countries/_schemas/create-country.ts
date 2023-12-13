import { z } from 'zod';

import { booleanSchema, imageSchema } from '@/lib/utils';

export const createCountrySchema = z.object({
  name: z.string().min(2).max(255),
  image: imageSchema,
  isFeatured: booleanSchema,
});
export type CreateCountryType = z.infer<typeof createCountrySchema>;
