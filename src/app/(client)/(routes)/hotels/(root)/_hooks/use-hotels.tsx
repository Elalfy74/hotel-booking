import { useQuery } from '@tanstack/react-query';

import { getHotels } from './get-hotels';

export const useHotels = () => {
  return useQuery({
    queryKey: ['hotels'],
    queryFn: () => getHotels(),
  });
};
