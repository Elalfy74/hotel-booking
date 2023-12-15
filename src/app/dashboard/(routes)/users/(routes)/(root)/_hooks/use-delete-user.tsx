import { useDeleteItem } from '@/app/dashboard/_hooks/use-delete-item';

import { deleteUserById } from '../../../_actions';
import { type CurrentUserTableQKeys } from './use-users-table';

interface UseDeleteUserProps {
  currentQKeys: CurrentUserTableQKeys;
}

export const useDeleteUser = ({ currentQKeys }: UseDeleteUserProps) => {
  return useDeleteItem({
    currentKeys: {
      arrayOfItemsKey: currentQKeys.usersQueryKey,
      countKey: currentQKeys.usersCountQueryKey,
    },
    itemName: 'user',
    mutationFn: deleteUserById,
  });
};
