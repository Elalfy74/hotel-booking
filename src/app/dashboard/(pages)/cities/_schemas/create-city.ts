import { z } from 'zod';

import { booleanSchema, imageSchema } from '@/lib/utils';

export const createCitySchema = z.object({
  name: z.string().min(2).max(255),
  images: z.array(imageSchema).nonempty(),
  countryId: z.string().cuid(),
  isFeatured: booleanSchema,
});
export type CreateCityType = z.infer<typeof createCitySchema>;
