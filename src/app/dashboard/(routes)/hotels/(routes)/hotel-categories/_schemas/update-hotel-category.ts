import { z } from 'zod';

import { createHotelCategorySchema } from './create-hotel-category';

export const updateHotelCategorySchema = createHotelCategorySchema;

export type UpdateHotelCategoryType = z.infer<typeof updateHotelCategorySchema>;
