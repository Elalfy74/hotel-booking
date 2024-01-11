'use client';

import { AppLoading } from '@/components/app-loading';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';

import { useHotelCategoriesTable } from '../_hooks/use-hotel-categories-table';
import { HotelCategoriesFilter } from './hotel-categories-filter';
import { columns } from './hotels-categories-columns';

export const HotelCategoriesTable = () => {
  const {
    hotelCategoriesData,
    hotelCategoriesLoading,
    hotelCategoriesFetching,

    hotelCategoriesCount,
    hotelCategoriesCountLoading,
    hotelCategoriesCountFetching,

    hotelCategoriesFilter,
    pagination,
    currentQKeys,
  } = useHotelCategoriesTable();

  // Handle Data Fetching Errors
  if (hotelCategoriesData?.error) throw new Error(hotelCategoriesData.error);
  if (hotelCategoriesCount?.error) throw new Error(hotelCategoriesCount.error);

  // Handle Loading State
  if (
    hotelCategoriesLoading ||
    hotelCategoriesCountLoading ||
    !hotelCategoriesData?.data ||
    hotelCategoriesCount?.data === undefined
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
      data={hotelCategoriesData.data}
      isLoading={hotelCategoriesFetching || hotelCategoriesCountFetching}
      filter={<HotelCategoriesFilter {...hotelCategoriesFilter} resetPage={pagination.resetPage} />}
      deleteBtn={DeleteButton}
      {...pagination}
    />
  );
};
