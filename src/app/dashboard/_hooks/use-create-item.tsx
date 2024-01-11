import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { type ActionRes } from '@/actions/utils';

import { type DefaultKeys, type DefaultKeyType } from './utils';

interface UseCreateItemProps<TResponse> {
  itemName: string;
  mutationFn: (formData: FormData) => Promise<ActionRes<TResponse>>;
  defaultKeys: DefaultKeys;
  successRoute: string;
  shouldNavigate?: boolean;
}

export function useCreateItem<TResponse extends { id: string }>(
  props: UseCreateItemProps<TResponse>,
) {
  const { defaultKeys, mutationFn, itemName, successRoute, shouldNavigate = true } = props;
  // [users, id]
  // Take the 'users' part
  const firstKeyOfDefaultKeys = Object.values(defaultKeys).map((value: DefaultKeyType) => value[0]);
  const defaultKeysAsString = Object.values(defaultKeys).map((value: DefaultKeyType) =>
    JSON.stringify(value),
  );

  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: async ({ error, data: createdItemData }) => {
      if (error || !createdItemData) return toast.error(error);

      toast.success(`${itemName} created successfully`);

      // Remove all Item queries except the default one
      queryClient.removeQueries({
        predicate: ({ queryKey }) => {
          if (!firstKeyOfDefaultKeys.includes(queryKey[0] as string)) return false;

          const queryKeyAsString = JSON.stringify(queryKey);

          if (defaultKeysAsString.includes(queryKeyAsString)) return false;

          return true;
        },
      });

      // Increment the default count query
      queryClient.setQueryData<ActionRes<number>>(defaultKeys.countKey, (oldData) => {
        if (!oldData || !oldData.data) return undefined;

        return {
          ...oldData,
          data: oldData.data + 1,
        };
      });

      // Prepend the new Item to the Array Of Items query
      queryClient.setQueryData<ActionRes<TResponse[]>>(defaultKeys.arrayOfItemsKey, (oldData) => {
        if (!oldData || !oldData.data) return undefined;

        const newData = oldData.data.slice(0, -1);
        newData.unshift(createdItemData);

        return {
          ...oldData,
          data: newData,
        };
      });

      // Set the  item query cache
      queryClient.setQueryData([itemName, createdItemData.id], {
        data: createdItemData,
      });

      if (shouldNavigate) {
        router.push(`/dashboard/${successRoute}`);
      }
    },
  });
}
