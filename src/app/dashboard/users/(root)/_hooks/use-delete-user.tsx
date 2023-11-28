import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteUserById } from '@/actions/users-actions';

export const useDeleteUser = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: deleteUserById,
    onSuccess: ({ error }) => {
      if (error) return toast.error(error);

      toast.success('User deleted successfully');
      onSuccess();
    },
  });
};
