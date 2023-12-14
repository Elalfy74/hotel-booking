'use server';

import { CityImage } from '@prisma/client';

import { asyncAdminHandler } from '@/actions/utils';
import prisma from '@/lib/prisma';
import { utapi } from '@/lib/uploadthing';
import { serialize } from '@/lib/utils';

import { updateCitySchema } from '../_schemas';
import { CityDto } from './city.dto';

export const updateCity = asyncAdminHandler(
  async ({ id, formData }: { id: string; formData: FormData }): Promise<CityDto> => {
    // Convert FormData to object
    const actionData = Object.fromEntries(formData);

    const receivedImages = formData.getAll('images');

    const receivedRemoveImagesAsJson = formData.getAll('removeImages') as string[];
    const receivedRemoveImages: CityImage[] = receivedRemoveImagesAsJson.map((image) =>
      JSON.parse(image),
    );

    // Validate Data
    const validation = updateCitySchema.safeParse({
      ...actionData,
      images: receivedImages.length ? receivedImages : undefined,
      removeImages: receivedRemoveImages.length ? receivedRemoveImages : undefined,
    });

    if (!validation.success) {
      throw new Error(validation.error.message);
    }

    const { images, removeImages, ...data } = validation.data;

    // Check if City exists
    const isCityExist = await prisma.city.findUnique({ where: { id } });
    if (!isCityExist) throw new Error('City does not exist');

    //Upload images
    let uploadedImagesURLs;

    if (images && images.length) {
      const imageFile = images as File[];
      const uploadedImages = await utapi.uploadFiles(imageFile);
      uploadedImagesURLs = uploadedImages.map((image) => ({
        url: image.data!.url,
      }));
    }

    const updatedCity = await prisma.city.update({
      where: { id },
      data: {
        ...data,
        images: {
          create: uploadedImagesURLs,
          delete: removeImages,
        },
      },
      include: {
        country: true,
        images: true,
      },
    });

    return serialize(CityDto, updatedCity);
  },
);
