import { useQuery } from '@tanstack/react-query';

import { getCountryById } from '../../../_actions';

export const useCountry = (countryId: string) => {
  return useQuery({
    queryKey: ['country', countryId],
    queryFn: () => getCountryById(countryId),
  });
};
