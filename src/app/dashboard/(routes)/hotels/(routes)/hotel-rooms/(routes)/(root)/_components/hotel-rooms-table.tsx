'use client';

import { AppLoading } from '@/components/app-loading';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';

import { useHotelRoomsTable } from '../_hooks/use-hotel-rooms-table';
import { HotelRoomsFilter } from './hotel-rooms-filter';
import { columns } from './hotels-rooms-columns';

export const HotelRoomsTable = () => {
  const {
    hotelRoomsData,
    hotelRoomsLoading,
    hotelRoomsFetching,

    hotelRoomsCount,
    hotelRoomsCountLoading,
    hotelRoomsCountFetching,

    hotelRoomsFilter,
    pagination,
    currentQKeys,
  } = useHotelRoomsTable();

  // Handle Data Fetching Errors
  if (hotelRoomsData?.error) throw new Error(hotelRoomsData.error);
  if (hotelRoomsCount?.error) throw new Error(hotelRoomsCount.error);

  // Handle Loading State
  if (
    hotelRoomsLoading ||
    hotelRoomsCountLoading ||
    !hotelRoomsData?.data ||
    hotelRoomsCount?.data === undefined
  ) {
    return <AppLoading />;
  }

  const DeleteButton = () => (
    <Button variant="destructive" size="sm" disabled>
      Delete Selected
    </Button>
  );

  return (
    <DataTable
      columns={columns(currentQKeys)}
      data={hotelRoomsData.data}
      isLoading={hotelRoomsFetching || hotelRoomsCountFetching}
      filter={<HotelRoomsFilter {...hotelRoomsFilter} resetPage={pagination.resetPage} />}
      deleteBtn={DeleteButton}
      {...pagination}
    />
  );
};
