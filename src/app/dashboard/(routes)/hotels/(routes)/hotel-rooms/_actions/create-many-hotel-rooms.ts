'use server';

import { asyncAdminHandler } from '@/actions/utils';
import prisma from '@/lib/prisma';

import { createManyHotelRoomsSchema } from '../_schemas/create-many-hotel-rooms';

export const createManyHotelRooms = asyncAdminHandler(
  async ({ hotelId, formData }: { hotelId: string; formData: FormData }) => {
    const actionData = Object.fromEntries(formData);

    // Validate data
    const validation = createManyHotelRoomsSchema.safeParse(actionData);

    if (!validation.success) {
      throw new Error(validation.error.message);
    }

    const data = validation.data;
    const dataWithHotelId = data.map((room) => ({ ...room, hotelId }));

    const hotelRooms = await prisma.hotelRoom.createMany({
      data: dataWithHotelId,
    });

    return hotelRooms;
  },
);
