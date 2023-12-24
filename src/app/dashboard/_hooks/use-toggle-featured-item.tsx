import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { type ActionRes } from '@/actions/utils';

import { type DefaultKeyType } from './utils';

interface useToggleFeaturedItemProps<TResponse> {
  mutationFn: (id: string) => Promise<ActionRes<TResponse>>;
  currentItemsKey: DefaultKeyType;
}

export function useToggleFeaturedItem<TResponse extends { id: string; isFeatured: boolean }>(
  props: useToggleFeaturedItemProps<TResponse>,
) {
  const { mutationFn, currentItemsKey } = props;

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onMutate(variables) {
      const previousData = queryClient.getQueryData<ActionRes<TResponse[]>>(currentItemsKey);

      queryClient.setQueryData<ActionRes<TResponse[]>>(currentItemsKey, (oldData) => {
        if (!oldData || !oldData.data) return undefined;

        const newData = oldData.data.map((item) => {
          if (item.id === variables) return { ...item, isFeatured: !item.isFeatured };
          return item;
        });

        return {
          ...oldData,
          data: newData,
        };
      });

      return { previousData };
    },

    onSuccess({ error }, _, context) {
      if (error) {
        toast.error(error);
        queryClient.setQueryData(currentItemsKey, context?.previousData);
      }
    },
  });
}
