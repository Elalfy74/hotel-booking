import { useMemo } from 'react';

import { useQueryPagination } from '@/hooks/use-query-pagination';

import { useHotelRooms } from './use-hotel-rooms';
import { useHotelRoomsFilter } from './use-hotel-rooms-filter';
import { useHotelRoomsCount } from './use-hotels-rooms-count';

export const useHotelRoomsTable = () => {
  const hotelRoomsFilter = useHotelRoomsFilter();

  // Fetch Hotel Rooms count
  const {
    data: hotelRoomsCount,
    isPending: hotelRoomsCountLoading,
    isFetching: hotelRoomsCountFetching,
    queryKey: hotelRoomsCountQueryKey,
  } = useHotelRoomsCount({ filter: hotelRoomsFilter.filter });

  const pagination = useQueryPagination({
    totalItems: hotelRoomsCount?.data,
  });

  // Fetch Hotel Rooms based on pagination and filter
  const {
    data: hotelRoomsData,
    isPending: hotelRoomsLoading,
    isFetching: hotelRoomsFetching,
    queryKey: hotelRoomsQueryKey,
  } = useHotelRooms({
    currentPage: pagination.currentPage,
    pageSize: pagination.pageSize,
    filter: hotelRoomsFilter.filter,
  });

  const currentQKeys = useMemo(
    () => ({ hotelRoomsQueryKey, hotelRoomsCountQueryKey }),
    [hotelRoomsCountQueryKey, hotelRoomsQueryKey],
  );

  return {
    currentQKeys,
    hotelRoomsData,
    hotelRoomsCount,
    pagination,
    hotelRoomsFilter,
    hotelRoomsLoading,
    hotelRoomsCountLoading,
    hotelRoomsCountFetching,
    hotelRoomsFetching,
  };
};
export type HotelRoomsTableKeys = ReturnType<typeof useHotelRoomsTable>['currentQKeys'];
