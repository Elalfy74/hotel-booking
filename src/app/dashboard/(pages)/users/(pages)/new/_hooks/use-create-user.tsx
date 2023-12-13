import { useCreateItem } from '@/app/dashboard/_hooks/use-create-item';

import { createUser } from '../../../_actions';
import { defaultUsersQueryKey } from '../../(root)/_hooks/use-users';
import { defaultUsersCountQueryKey } from '../../(root)/_hooks/use-users-count';

export const useCreateUser = () => {
  return useCreateItem({
    itemName: 'user',
    mutationFn: createUser,
    defaultKeys: {
      arrayOfItemsKey: defaultUsersQueryKey,
      countKey: defaultUsersCountQueryKey,
    },
    successRoute: 'users',
  });
};
