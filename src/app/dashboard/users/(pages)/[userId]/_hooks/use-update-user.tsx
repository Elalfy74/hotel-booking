import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { type GetUsersReturnType, updateUser } from '../../../_actions';
import { defaultUsersQueryKey } from '../../(root)/_hooks/use-users';
import { defaultUsersCountQueryKey } from '../../(root)/_hooks/use-users-count';

const defaultUsersQueryKeyAsString = JSON.stringify(defaultUsersQueryKey);
const defaultUsersCountQueryKeyAsString = JSON.stringify(defaultUsersCountQueryKey);

export const useUpdateUser = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const keysAsArray = [defaultUsersQueryKey, defaultUsersCountQueryKey].map(
    (value) => value[0],
  ) as string[];

  return useMutation({
    mutationFn: updateUser,
    onSuccess: ({ data, error }, { id }) => {
      if (error || !data) return toast.error(error);

      toast.success('User updated successfully');

      // Remove all users queries except the default one
      queryClient.removeQueries({
        predicate: ({ queryKey }) => {
          if (!keysAsArray.includes(queryKey[0] as string)) return false;

          const queryKeyAsString = JSON.stringify(queryKey);

          if (queryKeyAsString === defaultUsersQueryKeyAsString) return false;
          if (queryKeyAsString === defaultUsersCountQueryKeyAsString) return false;

          return true;
        },
      });

      // Update the default users query
      queryClient.setQueryData<GetUsersReturnType>(defaultUsersQueryKey, (oldData) => {
        if (!oldData || !oldData.data) return undefined;

        const user = oldData.data.find((user) => user.id === id);
        if (!user) return undefined;

        const newData = oldData.data.map((user) => {
          if (user.id === id) return data;
          return user;
        });

        return {
          ...oldData,
          data: newData,
        };
      });

      setTimeout(() => {
        router.push('/dashboard/users');
      }, 1000);
    },
  });
};
