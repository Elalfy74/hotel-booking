import { useDeleteItem } from '@/app/dashboard/_hooks/use-delete-item';

import { deleteCityById } from '../../../_actions';
import { type CitiesTableKeys } from './use-cities-table';

interface UseDeleteCityProps {
  currentQKeys: CitiesTableKeys;
}

export const useDeleteCity = ({ currentQKeys }: UseDeleteCityProps) => {
  return useDeleteItem({
    currentKeys: {
      arrayOfItemsKey: currentQKeys.citiesQueryKey,
      countKey: currentQKeys.citiesCountQueryKey,
    },
    itemName: 'city',
    mutationFn: deleteCityById,
  });
};
