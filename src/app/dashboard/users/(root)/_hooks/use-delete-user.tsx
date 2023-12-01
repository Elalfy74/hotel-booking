import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteUserById } from '@/actions/users-actions';

import { reValidateAfterDelete } from './utils';

interface UseDeleteUserProps {
  onSuccess: () => void;
  keys: any[];
}

export const useDeleteUser = ({ onSuccess, keys }: UseDeleteUserProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUserById,
    onSuccess: ({ error }) => {
      if (error) return toast.error(error);

      toast.success('User deleted successfully');
      onSuccess();

      reValidateAfterDelete({ queryClient, keys });
    },
  });
};
