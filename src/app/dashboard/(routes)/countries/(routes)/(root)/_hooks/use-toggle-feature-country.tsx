import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { type GetCountriesReturnType, toggleCountryIsFeatured } from '../../../_actions';
import { CurrentCountriesTableQKeys } from './use-countries-table';

interface UseToggleFeatureCountryProps {
  currentQKeys: CurrentCountriesTableQKeys;
  onChange: () => void;
}

export const useToggleFeatureCountry = ({
  currentQKeys,
  onChange,
}: UseToggleFeatureCountryProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleCountryIsFeatured,
    onMutate(variables) {
      const previousData = queryClient.getQueryData<GetCountriesReturnType>(
        currentQKeys.countriesQueryKey,
      );

      // To fix animation
      onChange();

      queryClient.setQueryData<GetCountriesReturnType>(
        currentQKeys.countriesQueryKey,
        (oldData) => {
          if (!oldData || !oldData.data) return undefined;

          const newData = oldData.data.map((country) => {
            if (country.id === variables) return { ...country, isFeatured: !country.isFeatured };
            return country;
          });

          return {
            ...oldData,
            data: newData,
          };
        },
      );

      return { previousData };
    },
    onSuccess({ error }, _, context) {
      if (error) {
        toast.error(error);
        queryClient.setQueryData(currentQKeys.countriesQueryKey, context?.previousData);
      }
    },
  });
};
