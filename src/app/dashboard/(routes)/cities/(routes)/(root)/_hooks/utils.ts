import { Prisma } from '@prisma/client';

export interface CitiesFilter {
  query: string;
  isFeatured: boolean | undefined;
  countriesFilter?: string[];
}

export function getCitiesWhereFilter(filter: CitiesFilter) {
  let where: Prisma.CityFindManyArgs['where'] = {};

  if (filter.query.trim().length > 0) {
    where.name = { contains: filter.query, mode: 'insensitive' };
  }

  if (filter.isFeatured !== undefined) {
    where.isFeatured = filter.isFeatured;
  }

  if (filter.countriesFilter?.length) {
    where.country = {
      id: {
        in: filter.countriesFilter,
      },
    };
  }

  return where;
}
