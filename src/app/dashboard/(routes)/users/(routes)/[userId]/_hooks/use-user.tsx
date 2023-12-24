import { useQuery } from '@tanstack/react-query';

import { getUserById } from '../../../_actions';

export const useUser = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserById(userId),
  });
};
