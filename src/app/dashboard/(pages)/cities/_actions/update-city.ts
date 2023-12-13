'use server';

import { type City } from '@prisma/client';

import { asyncAdminHandler } from '@/actions/utils';
import prisma from '@/lib/prisma';

import { updateCitySchema } from '../_schemas';

// TODO - Add images upload
export const updateCity = asyncAdminHandler(
  async ({ id, formData }: { id: string; formData: FormData }): Promise<City> => {
    // Convert FormData to object
    const actionData = Object.fromEntries(formData);

    // Validate Data
    const validation = updateCitySchema.safeParse(actionData);
    if (!validation.success) {
      throw new Error(validation.error.message);
    }

    const { images, ...data } = validation.data;

    // Check if City exists
    const isCityExist = await prisma.city.findUnique({ where: { id } });
    if (!isCityExist) throw new Error('City does not exist');

    return prisma.city.update({
      where: { id },
      data: {
        ...data,
      },
    });
  },
);
