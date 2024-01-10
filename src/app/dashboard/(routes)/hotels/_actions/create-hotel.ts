'use server';

import { type Country, Hotel } from '@prisma/client';

import { asyncAdminHandler } from '@/actions/utils';
import prisma from '@/lib/prisma';
import { utapi } from '@/lib/uploadthing';

import { createHotelSchema } from '../_schemas';

export const createHotel = asyncAdminHandler(async (formData: FormData): Promise<Hotel> => {
  const actionData = Object.fromEntries(formData);

  // Validate data
  const validation = createHotelSchema.safeParse(actionData);
  if (!validation.success) {
    throw new Error(validation.error.message);
  }

  const data = validation.data;

  // Check if Hotel exists
  const isHotelExists = await prisma.hotel.findUnique({
    where: { name: data.name },
  });
  if (isHotelExists) throw new Error('Hotel already exists');

  // Upload image
  const imageFile = data.image as File;
  const uploadedImage = await utapi.uploadFiles(imageFile);
  if (!uploadedImage.data) throw new Error('Image upload failed');

  return prisma.hotel.create({
    data: {
      rooms,
      reviews,
    },
  });
});
