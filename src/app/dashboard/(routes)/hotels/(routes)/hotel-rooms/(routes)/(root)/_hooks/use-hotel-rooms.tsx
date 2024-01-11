import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getHotelRooms } from '../../../_actions';
import { getHotelRoomsWhereFilter, HotelRoomsFilter } from './utils';

type DefaultHotelRoomsQueryKey = readonly [
  'hotel rooms',
  { currentPage: number; pageSize: number; filter: HotelRoomsFilter },
];
export const defaultHotelRoomsQueryKey: DefaultHotelRoomsQueryKey = [
  'hotel rooms',
  {
    currentPage: 1,
    pageSize: 10,
    filter: { query: '' },
  },
] as const;

interface UseHotelRoomsProps {
  currentPage: number;
  pageSize: number;
  filter: HotelRoomsFilter;
}

export const useHotelRooms = ({ currentPage, pageSize, filter }: UseHotelRoomsProps) => {
  const queryKey = ['hotel rooms', { currentPage, pageSize, filter }] as const;
  const where = getHotelRoomsWhereFilter(filter);

  const query = useQuery({
    queryKey,
    queryFn: () =>
      getHotelRooms({
        skip: (currentPage - 1) * pageSize,
        take: pageSize,
        where,
      }),
    placeholderData: keepPreviousData,
  });

  return {
    ...query,
    queryKey,
  };
};
