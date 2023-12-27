import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { getCities } from '@/actions/get-cities';

export const useCities = () => {
  const [querySearch, setQuerySearch] = useState('');

  const query = useQuery({
    queryKey: ['cities', querySearch],
    queryFn: () => getCities(querySearch),
    placeholderData: keepPreviousData,
  });

  return {
    ...query,
    value: querySearch,
    setValue: setQuerySearch,
  };
};
