'use server';

import { type Hotel } from '@prisma/client';

import { asyncAdminHandler } from '@/actions/utils';
import prisma from '@/lib/prisma';
import { utapi } from '@/lib/uploadthing';

import { createHotelSchema } from '../_schemas';

export const createHotel = asyncAdminHandler(async (formData: FormData): Promise<Hotel> => {
  const actionData = Object.fromEntries(formData);
  const images = formData.getAll('images');
  const features = formData.getAll('features');
  const parsedRooms = formData.getAll('rooms').map((room) => JSON.parse(room as string));

  // Validate data
  const validation = createHotelSchema.safeParse({
    ...actionData,
    images,
    features,
    rooms: parsedRooms,
  });
  if (!validation.success) {
    throw new Error(validation.error.message);
  }

  const data = validation.data;

  //Upload images
  const imageFile = data.images as File[];
  const uploadedImages = await utapi.uploadFiles(imageFile);
  const uploadedImagesURLs = uploadedImages.map((image) => ({
    url: image.data!.url,
  }));

  const hotel = await prisma.hotel.create({
    data: {
      ...data,
      features: {
        createMany: {
          data: data.features.map((feature) => ({
            featureId: feature,
          })),
        },
      },
      images: {
        createMany: {
          data: uploadedImagesURLs,
        },
      },
      rooms: {
        createMany: {
          data: data.rooms || [],
        },
      },
    },
  });

  return hotel;
});
