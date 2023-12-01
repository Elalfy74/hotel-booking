import { type QueryClient } from '@tanstack/react-query';

interface IReValidateAfterDelete {
  keys: any[];
  queryClient: QueryClient;
  amount?: number;
}

export function reValidateAfterDelete({ keys, queryClient, amount = 1 }: IReValidateAfterDelete) {
  const keysAsString = keys.map((key) => JSON.stringify(key));

  // Remove all queries except the current one
  queryClient.removeQueries({
    predicate: (query) => {
      const stringQueryKey = JSON.stringify(query.queryKey);

      const isFound = keysAsString.find((key) => key === stringQueryKey);
      if (isFound) return false;

      return true;
    },
  });

  // Update the current Count query locally
  queryClient.setQueryData<{ data: number; error?: string }>(keys[1], (oldData) => {
    if (!oldData) return oldData;

    return {
      ...oldData,
      data: oldData.data - amount,
    };
  });

  // Invalidate the current users to refetch the data as it should be equal to the page size
  queryClient.invalidateQueries({
    queryKey: keys[0],
  });
}
