import { ShieldCheckIcon, ShieldXIcon } from 'lucide-react';
import { useCallback, useState } from 'react';

import { ComboboxItemType } from '@/components/combobox';
import { FacetedOption } from '@/components/ui/data-table-faceted-filter';
import { DataTableResetFilter } from '@/components/ui/data-table-reset-filter';
import { DataTableSearchFilter } from '@/components/ui/data-table-search-filter';
import { DataTableSelectFilter } from '@/components/ui/data-table-select-filter';
import { useDebounce } from '@/hooks/use-debounce';

import { useHotelsFilter } from '../_hooks/use-hotels-filter';
import { CityFilter } from './city-filter';

interface HotelsFilterProps extends ReturnType<typeof useHotelsFilter> {
  resetPage: () => void;
}

export const HotelsFilter = (props: HotelsFilterProps) => {
  const { filter, setQ, setFeatured, setCitiesFilter, resetFilter, resetPage } = props;

  const onSearchValueChange = useCallback(
    (value: string) => {
      if (value === filter.query) {
        return;
      }
      resetPage();
      setQ(value);
    },
    [setQ, resetPage, filter.query],
  );

  const [value, setValue] = useDebounce({ onValueChange: onSearchValueChange });
  const [selectedCities, setSelectedCities] = useState<ComboboxItemType[]>([]);

  const handleSelectedCities = (values: ComboboxItemType[]) => {
    resetPage();
    setSelectedCities(values);
    setCitiesFilter(values.map((v) => v.value));
  };

  const isFiltering =
    value.length > 0 || filter.isFeatured !== undefined || !!selectedCities.length;

  const handleIsFeatured = (value: boolean) => {
    resetPage();
    if (value === filter.isFeatured) {
      setFeatured(undefined);
    } else {
      setFeatured(value);
    }
  };

  const reset = () => {
    setValue('');
    setSelectedCities([]);
    resetFilter();
    resetPage();
  };

  return (
    <>
      <DataTableSearchFilter value={value} setValue={setValue} placeholder="Filter Hotels..." />

      <CityFilter selectedCities={selectedCities} setSelectedCities={handleSelectedCities} />

      <DataTableSelectFilter
        options={options}
        onSelectedValueChange={handleIsFeatured}
        selectedValue={filter.isFeatured}
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
