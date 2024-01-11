import { useCreateItem } from '@/app/dashboard/_hooks/use-create-item';

import { createHotelCategory } from '../../../_actions';
import { defaultHotelCategoriesQueryKey } from './use-hotel-categories';
import { defaultHotelCategoriesCountQueryKey } from './use-hotels-categories-count';

export const useCreateHotelCategory = () => {
  return useCreateItem({
    itemName: 'hotel category',
    mutationFn: createHotelCategory,
    defaultKeys: {
      arrayOfItemsKey: defaultHotelCategoriesQueryKey,
      countKey: defaultHotelCategoriesCountQueryKey,
    },
    successRoute: 'hotel-categories',
    shouldNavigate: false,
  });
};
