import { useState } from 'react';

import { type ComboboxItemType } from '@/components/combobox';

export const useCitiesFilter = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isFeatured, setIsFeatured] = useState<boolean | undefined>(undefined);
  const [selectedCountries, setSelectedCountries] = useState<ComboboxItemType[]>([]);

  const resetFilter = () => {
    setSearchValue('');
    setIsFeatured(undefined);
    setSelectedCountries([]);
  };

  return {
    searchValue,
    setSearchValue,

    isFeatured,
    setIsFeatured,

    selectedCountries,
    setSelectedCountries,

    resetFilter,
  };
};
