import { useState } from 'react';

import { useCountries } from '@/app/dashboard/(routes)/countries/(routes)/(root)/_hooks/use-countries';
import { ComboboxItemType } from '@/components/combobox';
import { Button } from '@/components/ui/button';
import { DataTableControlledFacetedFilter } from '@/components/ui/data-table-controlled-faceted-filter';

interface CountryFilterProps {
  selectedCountries: ComboboxItemType[];
  setSelectedCountries: (selected: ComboboxItemType[]) => void;
}

export const CountryFilter = ({ selectedCountries, setSelectedCountries }: CountryFilterProps) => {
  const [query, setQuery] = useState('');

  const { data, isFetching, isLoading } = useCountries({
    currentPage: 1,
    pageSize: 5,
    filter: {
      query,
    },
  });

  if (isLoading || !data?.data) {
    return (
      <Button variant="outline" size="sm" className="h-8 border-dashed" disabled>
        Select Country...
      </Button>
    );
  }

  const items = data.data.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  if (selectedCountries.length > 0) {
    selectedCountries.forEach((selectedCountry) => {
      const isSelectedInItems = items.find((item) => item.value === selectedCountry.value);

      if (!isSelectedInItems) {
        items.unshift(selectedCountry);
      }
    });
  }

  return (
    <DataTableControlledFacetedFilter
      entityName="country"
      items={items}
      selectedValues={selectedCountries}
      setSearchChange={setQuery}
      setValues={setSelectedCountries}
      isFetching={isFetching}
    />
  );
};
