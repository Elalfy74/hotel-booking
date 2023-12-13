'use server';

import { type Country } from '@prisma/client';

import { asyncAdminHandler } from '@/actions/utils';
import prisma from '@/lib/prisma';
import { utapi } from '@/lib/uploadthing';

import { updateCountrySchema } from '../_schemas';

export const updateCountry = asyncAdminHandler(
  async ({ id, formData }: { id: string; formData: FormData }): Promise<Country> => {
    // Convert FormData to object
    const actionData = Object.fromEntries(formData);

    // Validate Data
    const validation = updateCountrySchema.safeParse(actionData);
    if (!validation.success) {
      throw new Error(validation.error.message);
    }

    const data = validation.data;

    // Check if country exists
    const isCountryExist = await prisma.country.findUnique({ where: { id } });
    if (!isCountryExist) throw new Error('Country does not exist');

    // Upload image
    let uploadedImage;
    const imageFile = data.image as File;

    if (imageFile) {
      uploadedImage = await utapi.uploadFiles(imageFile);
      if (!uploadedImage.data) throw new Error('Image upload failed');
    }

    return prisma.country.update({
      where: { id },
      data: {
        ...data,
        image: uploadedImage?.data.url,
      },
    });
  },
);
