import { ShieldCheckIcon, ShieldXIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { FacetedOption } from '@/components/ui/data-table-faceted-filter';
import { DataTableResetFilter } from '@/components/ui/data-table-reset-filter';
import { DataTableSearchFilter } from '@/components/ui/data-table-search-filter';
import { DataTableSelectFilter } from '@/components/ui/data-table-select-filter';

import { useCitiesFilter } from '../_hooks/use-cities-filter';
import { CountryFilter } from './country-filter';

interface CitiesFilterProps extends ReturnType<typeof useCitiesFilter> {
  resetPage: () => void;
}

export const CitiesFilter = (props: CitiesFilterProps) => {
  const {
    setSearchValue,
    isFeatured,
    setIsFeatured,
    resetFilter,
    selectedCountries,
    setSelectedCountries,
    resetPage,
  } = props;

  const [value, setValue] = useState('');
  const isFiltering = value.length > 0 || isFeatured !== undefined || selectedCountries.length > 0;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchValue(value);
      resetPage();
    }, 500);

    return () => clearTimeout(timeout);
  }, [value, setSearchValue, resetPage]);

  const handleIsFeatured = (value: boolean) => {
    if (value === isFeatured) {
      setIsFeatured(undefined);
    } else {
      setIsFeatured(value);
    }
    resetPage();
  };

  const reset = () => {
    setValue('');
    resetFilter();
    resetPage();
  };

  return (
    <>
      <DataTableSearchFilter value={value} setValue={setValue} placeholder="Filter Cities..." />

      <CountryFilter
        selectedCountries={selectedCountries}
        setSelectedCountries={setSelectedCountries}
      />

      <DataTableSelectFilter
        options={options}
        onSelectedValueChange={handleIsFeatured}
        selectedValue={isFeatured}
      />

      {isFiltering && <DataTableResetFilter reset={reset} />}
    </>
  );
};

const options: FacetedOption<boolean>[] = [
  {
    label: 'Featured',
    value: true,
    icon: ShieldCheckIcon,
  },
  {
    label: 'Not Featured',
    value: false,
    icon: ShieldXIcon,
  },
];
