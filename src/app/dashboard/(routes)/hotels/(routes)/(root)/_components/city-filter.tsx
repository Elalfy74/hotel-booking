import { useState } from 'react';

import { useCities } from '@/app/dashboard/(routes)/cities/(routes)/(root)/_hooks/use-cities';
import { ComboboxItemType } from '@/components/combobox';
import { Button } from '@/components/ui/button';
import { DataTableControlledFacetedFilter } from '@/components/ui/data-table-controlled-faceted-filter';

interface CityFilterProps {
  selectedCities: ComboboxItemType[];
  setSelectedCities: (selected: ComboboxItemType[]) => void;
}

export const CityFilter = ({ selectedCities, setSelectedCities }: CityFilterProps) => {
  const [query, setQuery] = useState('');

  const { data, isFetching, isLoading } = useCities({
    currentPage: 0,
    pageSize: 5,
    filter: {
      query,
      isFeatured: undefined,
    },
  });

  if (isLoading || !data?.data) {
    return (
      <Button variant="outline" size="sm" className="h-8 border-dashed" disabled>
        Select City...
      </Button>
    );
  }

  const items = data.data.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  if (selectedCities.length > 0) {
    selectedCities.forEach((selectedCity) => {
      const isSelectedInItems = items.find((item) => item.value === selectedCity.value);

      if (!isSelectedInItems) {
        items.unshift(selectedCity);
      }
    });
  }

  return (
    <DataTableControlledFacetedFilter
      entityName="city"
      items={items}
      selectedValues={selectedCities}
      setSearchChange={setQuery}
      setValues={setSelectedCities}
      isFetching={isFetching}
    />
  );
};
