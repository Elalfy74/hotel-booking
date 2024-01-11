import { parseAsJson, useQueryState } from 'nuqs';

import { HotelRoomsFilter } from './utils';

export const useHotelRoomsFilter = () => {
  const [filter, setFilter] = useQueryState(
    'filter',
    parseAsJson<HotelRoomsFilter>().withDefault({
      query: '',
      hotelId: undefined,
    }),
  );

  const setQ = (q: string) => {
    if (q === filter.query) {
      return;
    }
    setFilter({ ...filter, query: q });
  };

  const setHotelId = (hotelId: string | undefined) => {
    if (hotelId === filter.hotelId) {
      return;
    }
    setFilter({ ...filter, hotelId });
  };

  const resetFilter = () => {
    setFilter(null);
  };

  return {
    filter,
    setQ,
    setHotelId,
    resetFilter,
  };
};
