'use server';

import { asyncAdminHandler } from '@/actions/utils';
import prisma from '@/lib/prisma';

import { createHotelCategorySchema } from '../_schemas/create-hotel-category';
import { type IHotelCategory } from './get-hotel-categories';

export const createHotelCategory = asyncAdminHandler(
  async (formData: FormData): Promise<IHotelCategory> => {
    const actionData = Object.fromEntries(formData);

    // Validate data
    const validation = createHotelCategorySchema.safeParse(actionData);

    if (!validation.success) {
      throw new Error(validation.error.message);
    }

    const data = validation.data;

    const isHotelCategoryExists = await prisma.hotelCategory.findUnique({
      where: {
        name: data.name,
      },
    });

    if (isHotelCategoryExists) {
      throw new Error('Hotel Category already exists');
    }

    const hotelCategory = await prisma.hotelCategory.create({ data });

    return {
      ...hotelCategory,
      _count: {
        hotels: 0,
      },
    };
  },
);
