import { useCreateItem } from '@/app/dashboard/_hooks/use-create-item';

import { createCity } from '../../../_actions';
import { defaultCitiesQueryKey } from '../../(root)/_hooks/use-cities';
import { defaultCitiesCountQueryKey } from '../../(root)/_hooks/use-cities-count';

export const useCreateCity = () => {
  return useCreateItem({
    itemName: 'city',
    mutationFn: createCity,
    defaultKeys: {
      arrayOfItemsKey: defaultCitiesQueryKey,
      countKey: defaultCitiesCountQueryKey,
    },
    successRoute: 'cities',
  });
};
