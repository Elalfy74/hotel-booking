import { z } from 'zod';

import { createCitySchema } from './create-city';

export const updateCitySchema = createCitySchema.partial();
export type UpdateCityType = z.infer<typeof updateCitySchema>;
