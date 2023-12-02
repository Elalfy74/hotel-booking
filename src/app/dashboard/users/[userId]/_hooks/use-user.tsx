import { useQuery } from '@tanstack/react-query';

import { getUserById } from '../../_actions/get-user-by-id';

export const useUser = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserById(userId),
  });
};
