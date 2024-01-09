'use client';

import { DeleteManyItemsButtonProps } from '@/app/dashboard/_components/delete-many-button';
import { AppLoading } from '@/components/app-loading';
import { DataTable } from '@/components/ui/data-table';

import { useHotelsTable } from '../_hooks/use-hotels-table';
import { deleteManyHotelsButtonWithKeys } from './delete-many-hotels-button';
import { columns } from './hotels-columns';
import { HotelsFilter } from './hotels-filter';

export const HotelsTable = () => {
  const {
    hotelsData,
    hotelsLoading,
    hotelsFetching,

    hotelsCount,
    hotelsCountLoading,
    hotelsCountFetching,

    hotelsFilter,
    pagination,
    currentQKeys,
  } = useHotelsTable();

  // Handle Data Fetching Errors
  if (hotelsData?.error) throw new Error(hotelsData.error);
  if (hotelsCount?.error) throw new Error(hotelsCount.error);

  // Handle Loading State
  if (hotelsLoading || hotelsCountLoading || !hotelsData?.data || hotelsCount?.data === undefined) {
    return <AppLoading />;
  }

  const DeleteButton = deleteManyHotelsButtonWithKeys(currentQKeys);

  return (
    <DataTable
      columns={columns(currentQKeys)}
      data={hotelsData.data}
      isLoading={hotelsFetching || hotelsCountFetching}
      filter={<HotelsFilter {...hotelsFilter} resetPage={pagination.resetPage} />}
      deleteBtn={DeleteButton}
      {...pagination}
    />
  );
};
