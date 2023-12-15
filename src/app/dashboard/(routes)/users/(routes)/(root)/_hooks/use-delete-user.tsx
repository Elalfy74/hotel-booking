import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteUserById } from '../../../_actions';
import { type UserTableKeys } from './use-users-table';
import { reValidateAfterDelete } from './utils';

interface UseDeleteUserProps {
  keys: UserTableKeys;
}

export const useDeleteUser = ({ keys }: UseDeleteUserProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUserById,
    onSuccess: ({ error }) => {
      if (error) return toast.error(error);

      toast.success('User deleted successfully');

      reValidateAfterDelete({ queryClient, keys });
    },
  });
};
