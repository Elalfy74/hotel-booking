import { useDeleteItem } from '@/app/dashboard/_hooks/use-delete-item';

import { deleteHotelById } from '../../../_actions';
import { type HotelsTableKeys } from './use-hotels-table';

interface UseDeleteHotelProps {
  currentQKeys: HotelsTableKeys;
}

export const useDeleteHotel = ({ currentQKeys }: UseDeleteHotelProps) => {
  return useDeleteItem({
    currentKeys: {
      arrayOfItemsKey: currentQKeys.hotelsQueryKey,
      countKey: currentQKeys.hotelsCountQueryKey,
    },
    itemName: 'hotel',
    mutationFn: deleteHotelById,
  });
};
