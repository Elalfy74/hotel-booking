import { useQuery } from '@tanstack/react-query';

import { getCityById } from '../../../_actions';

export const useCity = (cityId: string) => {
  return useQuery({
    queryKey: ['city', cityId],
    queryFn: () => getCityById(cityId),
  });
};
