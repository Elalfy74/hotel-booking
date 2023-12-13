import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { GetCitiesReturnType, toggleCityIsFeatured } from '../../../_actions';
import { type CitiesTableKeys } from './use-cities-table';

interface UseToggleFeatureCityProps {
  keys: CitiesTableKeys;
  onChange: () => void;
}

export const useToggleFeatureCity = ({ keys, onChange }: UseToggleFeatureCityProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleCityIsFeatured,
    onMutate(variables) {
      const previousData = queryClient.getQueryData<GetCitiesReturnType>(keys.citiesQueryKey);

      // To fix animation
      onChange();

      queryClient.setQueryData<GetCitiesReturnType>(keys.citiesQueryKey, (oldData) => {
        if (!oldData || !oldData.data) return undefined;

        const newData = oldData.data.map((city) => {
          if (city.id === variables) return { ...city, isFeatured: !city.isFeatured };
          return city;
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
        queryClient.setQueryData(keys.citiesQueryKey, context?.previousData);
      }
    },
  });
};
