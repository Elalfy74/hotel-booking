import { parseAsJson, useQueryState } from 'nuqs';

import { type HotelCategoriesFilter } from './utils';

export const useHotelCategoriesFilter = () => {
  const [filter, setFilter] = useQueryState(
    'filter',
    parseAsJson<HotelCategoriesFilter>().withDefault({ query: '' }),
  );

  const setQ = (q: string) => {
    if (q === filter.query) {
      return;
    }
    setFilter({ ...filter, query: q });
  };

  const resetFilter = () => {
    setFilter(null);
  };

  return {
    filter,
    setQ,
    resetFilter,
  };
};
