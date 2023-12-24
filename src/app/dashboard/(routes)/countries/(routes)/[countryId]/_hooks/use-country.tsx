import { Country } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

import { getCountryById } from '../../../_actions';

export const useCountry = (countryId: string, initialData?: Country) => {
  return useQuery({
    queryKey: ['country', countryId],
    queryFn: () => getCountryById(countryId),
    placeholderData: initialData && { data: initialData },
  });
};
