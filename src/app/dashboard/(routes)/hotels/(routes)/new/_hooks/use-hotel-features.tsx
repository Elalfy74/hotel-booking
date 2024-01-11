import { Prisma } from '@prisma/client';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getHotelFeatures } from '../../../_actions';

export const useHotelFeatures = ({ query }: { query: string }) => {
  const where: Prisma.HotelFeatureWhereInput = {};

  if (query.trim().length) {
    where.name = {
      contains: query,
      mode: 'insensitive',
    };
  }

  return useQuery({
    queryKey: ['hotel-features', { query }],
    queryFn: () =>
      getHotelFeatures({
        take: 5,
        where,
      }),
    placeholderData: keepPreviousData,
  });
};
