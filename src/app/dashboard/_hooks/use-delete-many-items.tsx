import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { type ActionRes } from '@/actions/utils';

import { type DefaultKeys, reValidateAfterDelete } from './utils';

interface UseDeleteManyItemsProps {
  itemName: string;
  mutationFn: (ids: string[]) => Promise<ActionRes<void>>;
  currentKeys: DefaultKeys;
}

export const useDeleteManyItems = (props: UseDeleteManyItemsProps) => {
  const { itemName, currentKeys, mutationFn } = props;

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: ({ error }, removedItemId) => {
      if (error) return toast.error(error);

      toast.success(`selected ${itemName}s deleted successfully`);

      reValidateAfterDelete({ queryClient, currentKeys, removedItemId, itemName });
    },
  });
};
