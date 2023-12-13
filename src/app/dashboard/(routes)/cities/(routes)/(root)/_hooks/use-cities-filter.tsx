import { useState } from 'react';

export const useCitiesFilter = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isFeatured, setIsFeatured] = useState<boolean | undefined>(undefined);

  const resetFilter = () => {
    setSearchValue('');
    setIsFeatured(undefined);
  };

  return {
    searchValue,
    setSearchValue,
    isFeatured,
    setIsFeatured,
    resetFilter,
  };
};
