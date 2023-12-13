import { useUpdateItem } from '@/app/dashboard/_hooks/use-update-item';

import { updateCountry } from '../../../_actions';
import { defaultCountriesQueryKey } from '../../(root)/_hooks/use-countries';
import { defaultCountriesCountQueryKey } from '../../(root)/_hooks/use-countries-count';

export const useUpdateCountry = () => {
  return useUpdateItem({
    itemName: 'country',
    mutationFn: updateCountry,
    defaultKeys: {
      arrayOfItemsKey: defaultCountriesQueryKey,
      countKey: defaultCountriesCountQueryKey,
    },
    successRoute: 'countries',
  });
};
