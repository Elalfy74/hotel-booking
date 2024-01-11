import { z } from 'zod';

export const createHotelCategorySchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters long')
    .max(255, 'Name must be less than 255 characters long'),
});

export type CreateHotelCategoryType = z.infer<typeof createHotelCategorySchema>;
