import { Prisma } from '@prisma/client';

export interface CountriesFilter {
  query: string;
  isFeatured?: boolean;
}
export function getCountriesWhereFilter(filter: CountriesFilter) {
  let where: Prisma.CountryFindManyArgs['where'] = {};

  if (filter.query.trim().length > 0) {
    where.name = { contains: filter.query, mode: 'insensitive' };
  }

  if (filter.isFeatured !== undefined) {
    where.isFeatured = filter.isFeatured;
  }

  return where;
}
