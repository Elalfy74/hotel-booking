import { Prisma } from '@prisma/client';

export type HotelCategoriesFilter = {
  query: string;
};

export function getHotelCategoriesWhereFilter(filter: HotelCategoriesFilter) {
  const where: Prisma.HotelCategoryFindManyArgs['where'] = {};

  if (filter.query.trim().length > 0) {
    where.name = {
      contains: filter.query,
      mode: 'insensitive',
    };
  }

  return where;
}
