import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { type ActionRes } from '@/actions/utils';

import { type DefaultKeys, type DefaultKeyType } from './utils';

interface UseUpdateItemProps<TResponse> {
  itemName: string;
  mutationFn: (params: { id: string; formData: FormData }) => Promise<ActionRes<TResponse>>;
  defaultKeys: DefaultKeys;
  successRoute: string;
}

export function useUpdateItem<TResponse extends { id: string }>(
  props: UseUpdateItemProps<TResponse>,
) {
  const { defaultKeys, mutationFn, itemName, successRoute } = props;
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
    onSuccess: ({ error, data: updatedItemData }) => {
      if (error || !updatedItemData) return toast.error(error);

      toast.success(`${itemName} Updated successfully`, {
        className: 'capitalize',
      });

      // Remove all Item queries except the default ones
      queryClient.removeQueries({
        predicate: ({ queryKey }) => {
          // If not item query, keep it
          if (!firstKeyOfDefaultKeys.includes(queryKey[0] as string)) return false;

          // Convert the query key to string
          const queryKeyAsString = JSON.stringify(queryKey);

          // If default item query, keep it
          // We will update it manually
          if (defaultKeysAsString.includes(queryKeyAsString)) return false;

          // Remove anything else
          return true;
        },
      });

      // Update the default item query
      // Array Of Items Query
      queryClient.setQueryData<ActionRes<TResponse[]>>(defaultKeys.arrayOfItemsKey, (oldData) => {
        // If no old data, return undefined
        if (!oldData || !oldData.data) return undefined;

        // Find the item in the old data
        const item = oldData.data.find((item) => item.id === updatedItemData.id);
        if (!item) return undefined;

        // Replace the item with the updated one
        const newData = oldData.data.map((item) => {
          if (item.id === updatedItemData.id) return updatedItemData;
          return item;
        });

        return {
          ...oldData,
          data: newData,
        };
      });

      // Update the default item query cache
      queryClient.setQueryData([itemName, updatedItemData.id], {
        data: updatedItemData,
      });

      router.push(`/dashboard/${successRoute}`);
    },
  });
}

// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { useRouter } from 'next/navigation';
// import { toast } from 'sonner';

// import { type ActionRes } from '@/actions/utils';

// interface UseUpdateItemProps<TResponse> {
//   itemName: string;
//   mutationFn: (params: { id: string; formData: FormData }) => Promise<ActionRes<TResponse>>;
//   defaultKeys: (readonly [string, any])[];
//   successRoute: string;
// }

// export function useUpdateItem<TResponse extends { id: string }>(
//   props: UseUpdateItemProps<TResponse>,
// ) {
//   const { defaultKeys, mutationFn, itemName, successRoute } = props;
//   // [users, id]
//   // Take the 'users' part
//   const firstKeyOfDefaultKeys = defaultKeys.map((value) => value[0]);
//   const defaultKeysAsString = defaultKeys.map((value) => JSON.stringify(value));

//   const router = useRouter();
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn,
//     onSuccess: ({ error, data: updatedItemData }) => {
//       if (error || !updatedItemData) return toast.error(error);

//       toast.success(`${itemName} Updated successfully`, {
//         className: 'capitalize',
//       });

//       // Remove all Item queries except the default ones
//       queryClient.removeQueries({
//         predicate: ({ queryKey }) => {
//           // If not item query, keep it
//           if (!firstKeyOfDefaultKeys.includes(queryKey[0] as string)) return false;

//           // Convert the query key to string
//           const queryKeyAsString = JSON.stringify(queryKey);

//           // If default item query, keep it
//           // We will update it manually
//           if (defaultKeysAsString.includes(queryKeyAsString)) return false;

//           // Remove anything else
//           return true;
//         },
//       });

//       // Update the default item query
//       // Item[] Query
//       queryClient.setQueryData<ActionRes<TResponse[]>>(defaultKeys[0], (oldData) => {
//         // If no old data, return undefined
//         if (!oldData || !oldData.data) return undefined;

//         // Find the item in the old data
//         const item = oldData.data.find((item) => item.id === updatedItemData.id);
//         if (!item) return undefined;

//         // Replace the item with the updated one
//         const newData = oldData.data.map((item) => {
//           if (item.id === updatedItemData.id) return updatedItemData;
//           return item;
//         });

//         return {
//           ...oldData,
//           data: newData,
//         };
//       });

//       // Update the default item query cache
//       queryClient.setQueryData([itemName, updatedItemData.id], {
//         data: updatedItemData,
//       });

//       router.push(`/dashboard/${successRoute}`);
//     },
//   });
// }
