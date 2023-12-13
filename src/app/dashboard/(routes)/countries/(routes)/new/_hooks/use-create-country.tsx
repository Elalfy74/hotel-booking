import { useCreateItem } from '@/app/dashboard/_hooks/use-create-item';

import { createCountry } from '../../../_actions';
import { defaultCountriesQueryKey } from '../../(root)/_hooks/use-countries';
import { defaultCountriesCountQueryKey } from '../../(root)/_hooks/use-countries-count';

export const useCreateCountry = () => {
  return useCreateItem({
    itemName: 'country',
    mutationFn: createCountry,
    defaultKeys: {
      arrayOfItemsKey: defaultCountriesQueryKey,
      countKey: defaultCountriesCountQueryKey,
    },
    successRoute: 'countries',
  });
};
