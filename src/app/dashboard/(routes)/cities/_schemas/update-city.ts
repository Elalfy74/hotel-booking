import { z } from 'zod';

import { imageSchema } from '@/lib/utils';

import { createCitySchema } from './create-city';

const imageCitySchema = z.object({
  id: z.string(),
  url: z.string(),
  cityId: z.string(),
});

export const updateCitySchema = createCitySchema
  .omit({ images: true })
  .partial()
  .extend({
    removeImages: z.array(imageCitySchema).optional(),
    images: z.array(imageSchema).optional(),
  });

export type UpdateCityType = z.infer<typeof updateCitySchema>;
