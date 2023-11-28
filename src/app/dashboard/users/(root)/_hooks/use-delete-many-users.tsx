import { useMutation } from '@tanstack/react-query';

import { deleteManyUsers } from '@/actions/users-actions';

export const useDeleteManyUsers = () => {
  return useMutation({
    mutationFn: deleteManyUsers,
  });
};
