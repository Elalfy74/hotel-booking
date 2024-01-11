import { useDeleteItem } from '@/app/dashboard/_hooks/use-delete-item';

import { deleteHotelCategoryById } from '../../../_actions';
import { HotelCategoriesTableKeys } from './use-hotel-categories-table';

interface UseDeleteHotelCategoryProps {
  currentQKeys: HotelCategoriesTableKeys;
}

export const useDeleteHotelCategory = ({ currentQKeys }: UseDeleteHotelCategoryProps) => {
  return useDeleteItem({
    currentKeys: {
      arrayOfItemsKey: currentQKeys.hotelCategoriesQueryKey,
      countKey: currentQKeys.hotelCategoriesCountQueryKey,
    },
    itemName: 'hotel category',
    mutationFn: deleteHotelCategoryById,
  });
};
