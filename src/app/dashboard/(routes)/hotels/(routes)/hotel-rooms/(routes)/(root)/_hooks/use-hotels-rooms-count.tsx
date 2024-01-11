'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getHotelRoomsCount } from '../../../_actions';
import { getHotelRoomsWhereFilter, type HotelRoomsFilter } from './utils';

type DefaultHotelRoomsCountQueryKey = readonly ['hotel rooms count', { filter: HotelRoomsFilter }];
export const defaultHotelRoomsCountQueryKey: DefaultHotelRoomsCountQueryKey = [
  'hotel rooms count',
  { filter: { query: '' } },
] as const;

export const useHotelRoomsCount = ({ filter }: { filter: HotelRoomsFilter }) => {
  const queryKey = ['hotel rooms count', { filter }] as const;
  const where = getHotelRoomsWhereFilter(filter);

  const query = useQuery({
    queryKey,
    queryFn: () => getHotelRoomsCount({ where }),
    placeholderData: keepPreviousData,
  });

  return {
    ...query,
    queryKey,
  };
};
