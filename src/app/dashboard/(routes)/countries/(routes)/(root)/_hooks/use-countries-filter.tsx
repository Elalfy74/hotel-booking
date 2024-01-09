import { parseAsJson, useQueryState } from 'nuqs';

import { type CountriesFilter } from './utils';

export const useCountriesFilter = () => {
  const [filter, setFilter] = useQueryState(
    'filter',
    parseAsJson<CountriesFilter>().withDefault({
      query: '',
      isFeatured: undefined,
    }),
  );

  const setQ = (q: string) => {
    if (q === filter.query) {
      return;
    }
    setFilter({ ...filter, query: q });
  };

  const setFeatured = (isFeatured: boolean | undefined) => {
    if (isFeatured === filter.isFeatured) {
      return;
    }
    setFilter({ ...filter, isFeatured });
  };
  const resetFilter = () => {
    setFilter(null);
  };

  return {
    filter,
    setQ,
    setFeatured,
    resetFilter,
  };
};
