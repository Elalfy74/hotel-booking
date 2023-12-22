import { useDeleteItem } from '@/app/dashboard/_hooks/use-delete-item';

import { deleteCountryById } from '../../../_actions';
import { type CurrentCountriesTableQKeys } from './use-countries-table';

interface UseDeleteCountryProps {
  currentQKeys: CurrentCountriesTableQKeys;
}

export const useDeleteCountry = ({ currentQKeys }: UseDeleteCountryProps) => {
  return useDeleteItem({
    currentKeys: {
      arrayOfItemsKey: currentQKeys.countriesQueryKey,
      countKey: currentQKeys.countriesCountQueryKey,
    },
    itemName: 'country',
    mutationFn: deleteCountryById,
  });
};
