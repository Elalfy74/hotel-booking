import { parseAsJson, useQueryState } from 'nuqs';

import { type CitiesFilter } from './utils';

export const useCitiesFilter = () => {
  const [filter, setFilter] = useQueryState(
    'filter',
    parseAsJson<CitiesFilter>().withDefault({
      query: '',
      isFeatured: undefined,
      countriesFilter: undefined,
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
  const setCountriesFilter = (countriesIds: string[] | undefined) => {
    setFilter({ ...filter, countriesFilter: countriesIds });
  };

  const resetFilter = () => {
    setFilter(null);
  };

  return {
    filter,
    setQ,
    setFeatured,
    setCountriesFilter,
    resetFilter,
  };
};
