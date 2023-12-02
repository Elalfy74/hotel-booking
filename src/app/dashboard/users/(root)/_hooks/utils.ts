import { type QueryClient } from '@tanstack/react-query';

import { UserTableKeys } from './use-users-table';

interface IReValidateAfterDelete {
  keys: UserTableKeys;
  queryClient: QueryClient;
  amount?: number;
}

export function reValidateAfterDelete({ keys, queryClient, amount = 1 }: IReValidateAfterDelete) {
  type KeyOfKeys = keyof typeof keys;

  const keysAsString = new Map<KeyOfKeys, string>();

  for (const key in keys) {
    const k = key as KeyOfKeys;
    keysAsString.set(k, JSON.stringify(keys[k]));
  }

  // Remove all queries except the current one
  queryClient.removeQueries({
    predicate: (query) => {
      const stringQueryKey = JSON.stringify(query.queryKey);

      let isFound;

      keysAsString.forEach((value, key) => {
        if (value === stringQueryKey) {
          keysAsString.delete(key);
          isFound = true;
        }
      });

      return !isFound;
    },
  });

  // Update the current Count query locally
  queryClient.setQueryData<{ data: number; error?: string }>(keys.usersCountQueryKey, (oldData) => {
    if (!oldData) return oldData;

    return {
      ...oldData,
      data: oldData.data - amount,
    };
  });

  // Invalidate the current users to refetch the data as it should be equal to the page size
  queryClient.invalidateQueries({
    queryKey: keys.usersQueryKey,
  });
}
