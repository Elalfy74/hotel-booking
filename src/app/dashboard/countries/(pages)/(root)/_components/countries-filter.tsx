import { Role } from '@prisma/client';
import { BookmarkCheckIcon, ShieldCheckIcon, ShieldXIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { DataTableFacetedFilter, FacetedOption } from '@/components/ui/data-table-faceted-filter';
import { DataTableResetFilter } from '@/components/ui/data-table-reset-filter';
import { DataTableSearchFilter } from '@/components/ui/data-table-search-filter';

import { useCountriesFilter } from '../_hooks/use-countries-filter';

interface CountriesFilterProps extends ReturnType<typeof useCountriesFilter> {
  resetPage: () => void;
}

export const CountriesFilter = (props: CountriesFilterProps) => {
  const { setSearchValue, isFeatured, setIsFeatured, resetFilter, resetPage } = props;

  const [value, setValue] = useState('');
  const isFiltering = value.length > 0 || isFeatured === true;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchValue(value);
      resetPage();
    }, 500);

    return () => clearTimeout(timeout);
  }, [value, setSearchValue, resetPage]);

  const handleValueChange = (value: string) => {
    setValue(value);
  };

  const handleIsFeatured = (isFeatured: boolean) => {
    setIsFeatured(isFeatured);
    resetPage();
  };

  const reset = () => {
    setValue('');
    resetFilter();
    resetPage();
  };

  return (
    <>
      <DataTableSearchFilter
        value={value}
        setValue={handleValueChange}
        placeholder="Filter Countries..."
      />

      {/* <DataTableFacetedFilter
        title="isFeatured"
        options={options}
        selectedValues={isFeatured}
        onSelectedValuesChange={handleSelectedRolesChange}
      /> */}

      {isFiltering && <DataTableResetFilter reset={reset} />}
    </>
  );
};

const options: FacetedOption[] = [
  {
    label: 'Featured',
    value: '1',
    icon: ShieldCheckIcon,
  },
  {
    label: 'Not Featured',
    value: '0',
    icon: ShieldXIcon,
  },
];
