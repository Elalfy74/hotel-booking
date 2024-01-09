import { Prisma } from '@prisma/client';

export interface HotelsFilter {
  query: string;
  isFeatured: boolean | undefined;
  citiesFilter?: string[];
}

export function getHotelsWhereFilter(filter: HotelsFilter) {
  let where: Prisma.HotelFindManyArgs['where'] = {};

  if (filter.query.trim().length > 0) {
    where.name = { contains: filter.query, mode: 'insensitive' };
  }

  if (filter.isFeatured !== undefined) {
    where.isFeatured = filter.isFeatured;
  }

  if (filter.citiesFilter?.length) {
    where.city = {
      id: {
        in: filter.citiesFilter,
      },
    };
  }
  return where;
}
