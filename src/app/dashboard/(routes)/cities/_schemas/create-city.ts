import { z } from 'zod';

import { booleanSchema, imageSchema } from '@/lib/utils';

export const createCitySchema = z.object({
  name: z.string().min(2).max(255),
  images: z.array(imageSchema).min(1).max(5),
  countryId: z.string().min(10, 'Invalid Country'),
  isFeatured: booleanSchema,
});
export type CreateCityType = z.infer<typeof createCitySchema>;
