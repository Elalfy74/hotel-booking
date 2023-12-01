import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import {
  createUser,
  type GetUsersCountReturnType,
  type GetUsersReturnType,
} from '@/actions/users-actions';

import { defaultUsersQueryKey } from '../../(root)/_hooks/use-users';
import { defaultUsersCountQueryKey } from '../../(root)/_hooks/use-users-count';

const defaultUsersQueryKeyAsString = JSON.stringify(defaultUsersQueryKey);
const defaultUsersCountQueryKeyAsString = JSON.stringify(defaultUsersCountQueryKey);

export const useCreateUser = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: ({ error, data }) => {
      if (error || !data) return toast.error(error);

      toast.success('User created successfully');

      // Remove all users queries except the default one
      queryClient.removeQueries({
        predicate: ({ queryKey }) => {
          const queryKeyAsString = JSON.stringify(queryKey);

          if (queryKeyAsString === defaultUsersQueryKeyAsString) return false;
          if (queryKeyAsString === defaultUsersCountQueryKeyAsString) return false;

          return true;
        },
      });

      // Prepend the new user to the default users query
      queryClient.setQueryData<GetUsersReturnType>(defaultUsersQueryKey, (oldData) => {
        if (!oldData || !oldData.data) return undefined;

        const newData = oldData.data.slice(0, -1);
        newData.unshift(data);

        return {
          ...oldData,
          data: newData,
        };
      });

      // Increment the default users count query
      queryClient.setQueryData<GetUsersCountReturnType>(defaultUsersCountQueryKey, (oldData) => {
        if (!oldData || !oldData.data) return undefined;

        return {
          ...oldData,
          data: oldData.data + 1,
        };
      });

      setTimeout(() => {
        router.push('/dashboard/users');
      }, 1000);
    },
  });
};
