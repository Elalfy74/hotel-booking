import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteManyUsers } from '@/actions/users-actions';

import { reValidateAfterDelete } from './utils';

interface UseDeleteManyUsersProps {
  onSuccess: () => void;
  keys: any[];
}

export const useDeleteManyUsers = ({ onSuccess, keys }: UseDeleteManyUsersProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteManyUsers,
    onSuccess: ({ error }, variables) => {
      if (error) return toast.error(error);

      toast.success('Users deleted successfully');
      onSuccess();

      reValidateAfterDelete({ queryClient, keys, amount: variables.length });
    },
  });
};
