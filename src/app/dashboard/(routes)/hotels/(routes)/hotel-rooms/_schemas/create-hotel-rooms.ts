import { z } from 'zod';

export const createHotelRoomSchema = z.object({
  name: z.string().min(2).max(255),
  price: z.coerce.number().min(1).max(1000),
  beds: z.string().min(2).max(255),
  maxAdults: z.coerce.number().min(1).max(10),
  maxChildren: z.coerce.number().min(0).max(10),
});
export type CreateHotelRoomType = z.infer<typeof createHotelRoomSchema>;
