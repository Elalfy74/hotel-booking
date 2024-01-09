import { parseAsJson, useQueryState } from 'nuqs';

import { type HotelsFilter } from './utils';

export const useHotelsFilter = () => {
  const [filter, setFilter] = useQueryState(
    'filter',
    parseAsJson<HotelsFilter>().withDefault({
      query: '',
      isFeatured: undefined,
      citiesFilter: undefined,
      categoriesFilter: undefined,
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

  const setCitiesFilter = (citiesIds: string[] | undefined) => {
    setFilter({ ...filter, citiesFilter: citiesIds });
  };

  const setCategoriesFilter = (categoriesIds: string[] | undefined) => {
    setFilter({ ...filter, categoriesFilter: categoriesIds });
  };

  const resetFilter = () => {
    setFilter(null);
  };

  return {
    filter,
    setQ,
    setFeatured,
    setCitiesFilter,
    setCategoriesFilter,
    resetFilter,
  };
};
