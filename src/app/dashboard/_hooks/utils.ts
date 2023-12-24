import { type QueryClient } from '@tanstack/react-query';

import { type ActionRes } from '@/actions/utils';

export type DefaultKeyType = readonly [string, object];

export interface DefaultKeys {
  countKey: DefaultKeyType;
  arrayOfItemsKey: DefaultKeyType;
}

interface IReValidateAfterDelete {
  currentKeys: DefaultKeys;
  queryClient: QueryClient;
  itemName: string;
  removedItemId: string | string[];
}

export function reValidateAfterDelete({
  currentKeys,
  queryClient,
  itemName,
  removedItemId,
}: IReValidateAfterDelete) {
  const firstKeyOfCurrentKeys = Object.values(currentKeys).map((value: DefaultKeyType) => value[0]);
  const currentKeysAsString = Object.values(currentKeys).map((value: DefaultKeyType) =>
    JSON.stringify(value),
  );

  // Remove DeleteItem query cache or queries cache
  if (typeof removedItemId === 'string') {
    queryClient.removeQueries({
      queryKey: [itemName, removedItemId],
    });
  } else {
    removedItemId.forEach((id) => {
      queryClient.removeQueries({
        queryKey: [itemName, id],
      });
    });
  }

  // Remove all Item queries except the current ones
  queryClient.removeQueries({
    predicate: ({ queryKey }) => {
      if (!firstKeyOfCurrentKeys.includes(queryKey[0] as string)) return false;

      const queryKeyAsString = JSON.stringify(queryKey);

      if (currentKeysAsString.includes(queryKeyAsString)) return false;

      return true;
    },
  });

  // Decrement the current count query
  queryClient.setQueryData<ActionRes<number>>(currentKeys.countKey, (oldData) => {
    if (!oldData || !oldData.data) return undefined;

    const numberRemovedItems = typeof removedItemId === 'string' ? 1 : removedItemId.length;

    return {
      ...oldData,
      data: oldData.data - numberRemovedItems,
    };
  });

  // Invalidate the current items query to refetch the data as it should be equal to the page size
  queryClient.invalidateQueries({
    queryKey: currentKeys.arrayOfItemsKey,
  });
}
