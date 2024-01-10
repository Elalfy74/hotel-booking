import { useState } from 'react';

import { ComboboxItemType } from '@/components/combobox';
import { Button } from '@/components/ui/button';
import { DataTableControlledFacetedFilter } from '@/components/ui/data-table-controlled-faceted-filter';

import { useHotelFeatures } from '../_hooks/use-hotel-features';

interface HotelFeaturesInputProps {
  setSelectedFeaturesIds: (featuresIds: string[]) => void;
}

export const HotelFeaturesInput = ({ setSelectedFeaturesIds }: HotelFeaturesInputProps) => {
  const [query, setQuery] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState<ComboboxItemType[]>([]);

  const { data, isFetching, isLoading } = useHotelFeatures({ query });

  const handleSelectFeatures = (features: ComboboxItemType[]) => {
    setSelectedFeatures(features);
    setSelectedFeaturesIds(features.map((feature) => feature.value));
  };

  if (isLoading || !data?.data) {
    return (
      <Button variant="outline" size="sm" className="h-8 border-dashed" disabled>
        Select Feature...
      </Button>
    );
  }

  const items = data.data.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  if (selectedFeatures.length > 0) {
    selectedFeatures.forEach((feature) => {
      const isSelectedInItems = items.find((item) => item.value === feature.value);

      if (!isSelectedInItems) {
        items.unshift(feature);
      }
    });
  }

  return (
    <DataTableControlledFacetedFilter
      entityName="Feature"
      items={items}
      selectedValues={selectedFeatures}
      setSearchChange={setQuery}
      setValues={handleSelectFeatures}
      isFetching={isFetching}
      className="w-[250px]"
    />
  );
};
