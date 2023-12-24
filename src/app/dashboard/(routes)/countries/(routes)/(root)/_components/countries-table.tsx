'use client';

import { AppLoading } from '@/components/app-loading';
import { DataTable } from '@/components/ui/data-table';

import { useCountriesTable } from '../_hooks/use-countries-table';
import { columns } from './countries-columns';
import { CountriesFilter } from './countries-filter';
import { deleteManyCountriesButtonWithKeys } from './delete-many-countries-button';

export const CountriesTable = () => {
  const {
    countriesData,
    countriesLoading,
    countriesFetching,

    countriesCount,
    countriesCountLoading,
    countriesCountFetching,

    countriesFilter,
    pagination,
    currentQKeys,
  } = useCountriesTable();

  // Handle Data Fetching Errors
  if (countriesData?.error) throw new Error(countriesData.error);
  if (countriesCount?.error) throw new Error(countriesCount.error);

  // Handle Loading State
  if (
    countriesLoading ||
    countriesCountLoading ||
    !countriesData?.data ||
    countriesCount?.data === undefined
  ) {
    return <AppLoading />;
  }

  const DeleteButton = deleteManyCountriesButtonWithKeys(currentQKeys);

  return (
    <DataTable
      columns={columns(currentQKeys)}
      data={countriesData.data}
      isLoading={countriesFetching || countriesCountFetching}
      filter={<CountriesFilter {...countriesFilter} resetPage={pagination.resetPage} />}
      deleteBtn={DeleteButton}
      {...pagination}
    />
  );
};
