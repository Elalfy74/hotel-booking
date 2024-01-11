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

    const hotelCategory = await prisma.hotelCategory.create({ data });

    return {
      ...hotelCategory,
      _count: {
        hotels: 0,
      },
    };
  },
);
