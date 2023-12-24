import { useDeleteManyItems } from '@/app/dashboard/_hooks/use-delete-many-items';

import { deleteManyCities } from '../../../_actions';
import { type CitiesTableKeys } from './use-cities-table';

interface UseDeleteManyCitiesProps {
  currentQKeys: CitiesTableKeys;
}

export const useDeleteManyCities = ({ currentQKeys }: UseDeleteManyCitiesProps) => {
  return useDeleteManyItems({
    currentKeys: {
      arrayOfItemsKey: currentQKeys.citiesQueryKey,
      countKey: currentQKeys.citiesCountQueryKey,
    },
    itemName: 'city',
    mutationFn: deleteManyCities,
  });
};
