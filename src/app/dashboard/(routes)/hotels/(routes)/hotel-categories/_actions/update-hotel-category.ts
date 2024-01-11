'use server';

import { asyncAdminHandler } from '@/actions/utils';
import prisma from '@/lib/prisma';

import { updateHotelCategorySchema } from '../_schemas/update-hotel-category';
import { type IHotelCategory } from './get-hotel-categories';

export const updateHotelCategory = asyncAdminHandler(
  async ({ id, formData }: { id: string; formData: FormData }): Promise<IHotelCategory> => {
    const actionData = Object.fromEntries(formData);

    // Validate data
    const validation = updateHotelCategorySchema.safeParse(actionData);

    if (!validation.success) {
      throw new Error(validation.error.message);
    }

    const data = validation.data;

    const isHotelCategoryExists = await prisma.hotelCategory.findUnique({
      where: { id },
    });

    if (!isHotelCategoryExists) {
      throw new Error('Hotel Category Not Found');
    }

    const hotelCategory = await prisma.hotelCategory.update({
      where: { id },
      data,
      include: {
        _count: {
          select: { hotels: true },
        },
      },
    });

    return hotelCategory;
  },
);
