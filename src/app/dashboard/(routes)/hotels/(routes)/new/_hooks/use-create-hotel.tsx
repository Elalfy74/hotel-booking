import { useCreateItem } from '@/app/dashboard/_hooks/use-create-item';

import { createHotel } from '../../../_actions';
import { defaultHotelsQueryKey } from '../../(root)/_hooks/use-hotels';
import { defaultHotelsCountQueryKey } from '../../(root)/_hooks/use-hotels-count';

export const useCreateHotel = () => {
  return useCreateItem({
    itemName: 'hotel',
    mutationFn: createHotel,
    defaultKeys: {
      arrayOfItemsKey: defaultHotelsQueryKey,
      countKey: defaultHotelsCountQueryKey,
    },
    successRoute: 'hotels',
  });
};
