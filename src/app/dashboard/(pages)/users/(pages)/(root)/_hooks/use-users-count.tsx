import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getUsersCount } from '../../../_actions';
import { getUsersWhereFilter, type UsersFilter } from './utils';

interface UseUsersCountProps {
  filter: UsersFilter;
}

export const defaultUsersCountQueryKey = [
  'users count',
  { filter: { query: '', role: [] } },
] as const;

export const useUsersCount = ({ filter }: UseUsersCountProps) => {
  const queryKey = ['users count', { filter }];
  const where = getUsersWhereFilter(filter);

  const query = useQuery({
    queryKey,
    queryFn: () => getUsersCount({ where }),
    placeholderData: keepPreviousData,
  });

  return {
    ...query,
    queryKey,
  };
};
