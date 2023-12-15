import { useDeleteManyItems } from '@/app/dashboard/_hooks/use-delete-many-items';

import { deleteManyUsers } from '../../../_actions';
import { type CurrentUserTableQKeys } from './use-users-table';

interface UseDeleteManyUsersProps {
  currentQKeys: CurrentUserTableQKeys;
}

export const useDeleteManyUsers = ({ currentQKeys }: UseDeleteManyUsersProps) => {
  return useDeleteManyItems({
    itemName: 'user',
    mutationFn: deleteManyUsers,
    currentKeys: {
      arrayOfItemsKey: currentQKeys.usersQueryKey,
      countKey: currentQKeys.usersCountQueryKey,
    },
  });
};
