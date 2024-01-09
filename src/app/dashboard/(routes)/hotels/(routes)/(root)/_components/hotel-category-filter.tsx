import { useState } from 'react';

import { useHotelCategories } from '@/app/dashboard/(routes)/hotel-categories/(routes)/(root)/_hooks/use-hotel-categories';
import { ComboboxItemType } from '@/components/combobox';
import { Button } from '@/components/ui/button';
import { DataTableControlledFacetedFilter } from '@/components/ui/data-table-controlled-faceted-filter';

interface HotelCategoryFilterProps {
  selectedCategories: ComboboxItemType[];
  setSelectedCategories: (selected: ComboboxItemType[]) => void;
}

export const HotelCategoryFilter = ({
  selectedCategories,
  setSelectedCategories,
}: HotelCategoryFilterProps) => {
  const [query, setQuery] = useState('');

  const { data, isFetching, isLoading } = useHotelCategories({
    currentPage: 1,
    pageSize: 5,
    filter: { query },
  });

  if (isLoading || !data?.data) {
    return (
      <Button variant="outline" size="sm" className="h-8 border-dashed" disabled>
        Select Hotel Category...
      </Button>
    );
  }

  const items = data.data.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  if (selectedCategories.length > 0) {
    selectedCategories.forEach((selectedCategory) => {
      const isSelectedInItems = items.find((item) => item.value === selectedCategory.value);

      if (!isSelectedInItems) {
        items.unshift(selectedCategory);
      }
    });
  }

  return (
    <DataTableControlledFacetedFilter
      entityName="hotel category"
      items={items}
      selectedValues={selectedCategories}
      setSearchChange={setQuery}
      setValues={setSelectedCategories}
      isFetching={isFetching}
    />
  );
};
