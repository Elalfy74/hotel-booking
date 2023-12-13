'use server';

import { type Country } from '@prisma/client';

import { asyncAdminHandler } from '@/actions/utils';
import prisma from '@/lib/prisma';
import { utapi } from '@/lib/uploadthing';

import { createCountrySchema } from '../_schemas';

export const createCountry = asyncAdminHandler(async (formData: FormData): Promise<Country> => {
  const actionData = Object.fromEntries(formData);

  // Validate data
  const validation = createCountrySchema.safeParse(actionData);
  if (!validation.success) {
    throw new Error(validation.error.message);
  }

  const data = validation.data;

  // Check if country exists
  const isCountryExists = await prisma.country.findUnique({
    where: { name: data.name },
  });
  if (isCountryExists) throw new Error('Country already exists');

  // Upload image
  const imageFile = data.image as File;
  const uploadedImage = await utapi.uploadFiles(imageFile);
  if (!uploadedImage.data) throw new Error('Image upload failed');

  return prisma.country.create({
    data: {
      ...data,
      image: uploadedImage.data.url,
    },
  });
});
