'use client';

import { AppLoading } from '@/components/app-loading';
import { DataTable } from '@/components/ui/data-table';

import { useCitiesTable } from '../_hooks/use-cities-table';
import { columns } from './cities-columns';
import { CitiesFilter } from './cities-filter';
import { deleteManyCitiesButtonWithKeys } from './delete-many-cities-button';

export const CitiesTable = () => {
  const {
    citiesData,
    citiesLoading,
    citiesFetching,

    citiesCount,
    citiesCountLoading,
    citiesCountFetching,

    citiesFilter,
    pagination,
    currentQKeys,
  } = useCitiesTable();

  // Handle Data Fetching Errors
  if (citiesData?.error) throw new Error(citiesData.error);
  if (citiesCount?.error) throw new Error(citiesCount.error);

  // Handle Loading State
  if (citiesLoading || citiesCountLoading || !citiesData?.data || citiesCount?.data === undefined) {
    return <AppLoading />;
  }

  const DeleteButton = deleteManyCitiesButtonWithKeys(currentQKeys);

  return (
    <DataTable
      columns={columns(currentQKeys)}
      data={citiesData.data}
      isLoading={citiesFetching || citiesCountFetching}
      filter={<CitiesFilter {...citiesFilter} resetPage={pagination.resetPage} />}
      deleteBtn={DeleteButton}
      {...pagination}
    />
  );
};
