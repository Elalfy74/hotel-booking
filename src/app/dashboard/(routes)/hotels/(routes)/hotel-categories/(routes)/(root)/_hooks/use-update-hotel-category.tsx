import { useUpdateItem } from '@/app/dashboard/_hooks/use-update-item';

import { updateHotelCategory } from '../../../_actions';
import { defaultHotelCategoriesQueryKey } from './use-hotel-categories';
import { defaultHotelCategoriesCountQueryKey } from './use-hotel-categories-count';

export const useUpdateHotelCategory = () => {
  return useUpdateItem({
    itemName: 'hotel category',
    mutationFn: updateHotelCategory,
    defaultKeys: {
      arrayOfItemsKey: defaultHotelCategoriesQueryKey,
      countKey: defaultHotelCategoriesCountQueryKey,
    },
    successRoute: 'hotels/hotel-categories',
  });
};
