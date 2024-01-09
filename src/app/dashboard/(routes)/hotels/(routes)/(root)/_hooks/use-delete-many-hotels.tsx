import { useDeleteManyItems } from '@/app/dashboard/_hooks/use-delete-many-items';

import { deleteManyHotels } from '../../../_actions';
import { type HotelsTableKeys } from './use-hotels-table';

interface UseDeleteManyHotelsProps {
  currentQKeys: HotelsTableKeys;
}

export const useDeleteManyHotels = ({ currentQKeys }: UseDeleteManyHotelsProps) => {
  return useDeleteManyItems({
    currentKeys: {
      arrayOfItemsKey: currentQKeys.hotelsQueryKey,
      countKey: currentQKeys.hotelsCountQueryKey,
    },
    itemName: 'city',
    mutationFn: deleteManyHotels,
  });
};
