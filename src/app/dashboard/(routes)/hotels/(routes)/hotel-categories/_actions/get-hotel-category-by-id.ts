'use server';

import { type HotelCategory } from '@prisma/client';

import { asyncAdminHandler } from '@/actions/utils';
import prisma from '@/lib/prisma';

export const getHotelCategoryById = asyncAdminHandler(
  async (id: string): Promise<HotelCategory | null> => {
    return prisma.hotelCategory.findUnique({
      where: { id },
    });
  },
);
