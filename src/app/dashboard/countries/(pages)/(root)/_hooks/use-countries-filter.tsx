import { useState } from 'react';

export const useCountriesFilter = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isFeatured, setIsFeatured] = useState<boolean | undefined>();

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
