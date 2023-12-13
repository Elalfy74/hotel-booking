import { useUpdateItem } from '@/app/dashboard/_hooks/use-update-item';

import { updateUser } from '../../../_actions';
import { defaultUsersQueryKey } from '../../(root)/_hooks/use-users';
import { defaultUsersCountQueryKey } from '../../(root)/_hooks/use-users-count';

export const useUpdateUser = () => {
  return useUpdateItem({
    itemName: 'user',
    mutationFn: updateUser,
    defaultKeys: {
      arrayOfItemsKey: defaultUsersQueryKey,
      countKey: defaultUsersCountQueryKey,
    },
    successRoute: 'users',
  });
};
