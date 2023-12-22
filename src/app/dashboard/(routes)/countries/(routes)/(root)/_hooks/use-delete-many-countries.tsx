import { useDeleteManyItems } from '@/app/dashboard/_hooks/use-delete-many-items';

import { deleteManyCountries } from '../../../_actions';
import { type CurrentCountriesTableQKeys } from './use-countries-table';

interface UseDeleteManyCountriesProps {
  currentQKeys: CurrentCountriesTableQKeys;
}

export const useDeleteManyCountries = ({ currentQKeys }: UseDeleteManyCountriesProps) => {
  return useDeleteManyItems({
    itemName: 'country',
    mutationFn: deleteManyCountries,
    currentKeys: {
      arrayOfItemsKey: currentQKeys.countriesQueryKey,
      countKey: currentQKeys.countriesCountQueryKey,
    },
  });
};
