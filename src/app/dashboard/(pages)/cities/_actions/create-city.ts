'use server';

import { asyncAdminHandler } from '@/actions/utils';
import prisma from '@/lib/prisma';
import { utapi } from '@/lib/uploadthing';
import { serialize } from '@/lib/utils';

import { createCitySchema } from '../_schemas';
import { CityDto } from './city.dto';

export const createCity = asyncAdminHandler(async (formData: FormData): Promise<CityDto> => {
  const actionData = Object.fromEntries(formData);
  const images = formData.getAll('images');

  // Validate data
  const validation = createCitySchema.safeParse({
    ...actionData,
    images,
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

  const city = await prisma.city.create({
    data: {
      ...data,
      images: {
        createMany: {
          data: uploadedImagesURLs,
        },
      },
    },
    include: {
      country: true,
    },
  });

  const fullCityData = {
    ...city,
    images: uploadedImagesURLs,
  };

  return serialize(CityDto, fullCityData);
});
