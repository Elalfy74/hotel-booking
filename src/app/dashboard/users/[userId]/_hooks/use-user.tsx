import { useQuery } from '@tanstack/react-query';

import { getUserById } from '@/actions/users-actions';

export const useUser = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserById(userId),
  });
};
