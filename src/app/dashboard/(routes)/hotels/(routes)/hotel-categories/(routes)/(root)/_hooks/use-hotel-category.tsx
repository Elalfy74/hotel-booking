import { useQuery } from '@tanstack/react-query';

import { getHotelCategoryById } from '../../../_actions';

export const useHotelCategory = (id: string) => {
  return useQuery({
    queryKey: ['hotel category', id],
    queryFn: () => getHotelCategoryById(id),
  });
};
