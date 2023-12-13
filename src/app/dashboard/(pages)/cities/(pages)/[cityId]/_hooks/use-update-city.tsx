import { useUpdateItem } from '@/app/dashboard/_hooks/use-update-item';

import { updateCity } from '../../../_actions';
import { defaultCitiesQueryKey } from '../../(root)/_hooks/use-cities';
import { defaultCitiesCountQueryKey } from '../../(root)/_hooks/use-cities-count';

export const useUpdateCity = () => {
  return useUpdateItem({
    itemName: 'city',
    mutationFn: updateCity,
    defaultKeys: {
      arrayOfItemsKey: defaultCitiesQueryKey,
      countKey: defaultCitiesCountQueryKey,
    },
    successRoute: 'cities',
  });
};
