import { z } from 'zod';

import { booleanSchema, imageSchema } from '@/lib/utils';

import { createHotelRoomSchema } from '../(routes)/hotel-rooms/_schemas/create-hotel-rooms';

export const createHotelSchema = z.object({
  name: z.string().min(2).max(255),
  description: z.string().min(2).max(255),
  categoryId: z.string().min(10, 'Invalid Category'),
  stars: z.coerce.number().min(1).max(5),
  isFeatured: booleanSchema,
  cityId: z.string().min(10, 'Invalid City'),
  address: z.string().min(2).max(255),
  distanceToDTInKm: z.coerce.number().min(1).max(1000),
  images: z.array(imageSchema).min(1).max(5),
  features: z.array(z.string()).min(1).max(10),
  rooms: z.array(createHotelRoomSchema).max(5).optional(),
});
export type CreateHotelType = z.infer<typeof createHotelSchema>;
