import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { type GetCountriesReturnType, toggleCountryIsFeatured } from '../../../_actions';
import { CountriesTableKeys } from './use-countries-table';

interface UseToggleFeatureCountryProps {
  keys: CountriesTableKeys;
  onChange: () => void;
}

export const useToggleFeatureCountry = ({ keys, onChange }: UseToggleFeatureCountryProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleCountryIsFeatured,
    onMutate(variables) {
      const previousData = queryClient.getQueryData<GetCountriesReturnType>(keys.countriesQueryKey);

      // To fix animation
      onChange();

      queryClient.setQueryData<GetCountriesReturnType>(keys.countriesQueryKey, (oldData) => {
        if (!oldData || !oldData.data) return undefined;

        const newData = oldData.data.map((country) => {
          if (country.id === variables) return { ...country, isFeatured: !country.isFeatured };
          return country;
        });

        return {
          ...oldData,
          data: newData,
        };
      });

      return { previousData };
    },
    onSuccess({ error }, variables, context) {
      if (error) {
        toast.error(error);
        queryClient.setQueryData(keys.countriesQueryKey, context?.previousData);
      }
    },
  });
};
