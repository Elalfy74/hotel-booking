import { z } from 'zod';

import { createHotelRoomSchema } from './create-hotel-rooms';

export const createManyHotelRoomsSchema = z.array(createHotelRoomSchema).min(1).max(10);

export type CreateManyHotelRoomsType = z.infer<typeof createManyHotelRoomsSchema>;
