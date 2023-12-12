import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { createCountry, type GetCountriesCountReturnType } from '../../../_actions';
import { defaultCountriesQueryKey } from '../../(root)/_hooks/use-countries';
import { defaultCountriesCountQueryKey } from '../../(root)/_hooks/use-countries-count';

const defaultCountriesQueryKeyAsString = JSON.stringify(defaultCountriesQueryKey);
const defaultCountriesCountQueryKeyAsString = JSON.stringify(defaultCountriesCountQueryKey);

export const useCreateCountry = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const defaultKeysAsArray = [defaultCountriesQueryKey, defaultCountriesCountQueryKey].map(
    (value) => value[0],
  ) as string[];

  return useMutation({
    mutationFn: createCountry,
    onSuccess: async ({ error, data }) => {
      if (error || !data) return toast.error(error);

      toast.success('Country created successfully');

      // Remove all users queries except the default users one
      queryClient.removeQueries({
        predicate: ({ queryKey }) => {
          if (!defaultKeysAsArray.includes(queryKey[0] as string)) return false;

          const queryKeyAsString = JSON.stringify(queryKey);

          if (queryKeyAsString === defaultCountriesQueryKeyAsString) return false;
          if (queryKeyAsString === defaultCountriesCountQueryKeyAsString) return false;

          return true;
        },
      });

      // Increment the default countries count query
      queryClient.setQueryData<GetCountriesCountReturnType>(
        defaultCountriesCountQueryKey,
        (oldData) => {
          if (!oldData || !oldData.data) return undefined;

          return {
            ...oldData,
            data: oldData.data + 1,
          };
        },
      );

      await queryClient.invalidateQueries({
        queryKey: defaultCountriesQueryKey,
      });

      setTimeout(() => {
        router.push('/dashboard/countries');
      }, 1000);
    },
  });
};
