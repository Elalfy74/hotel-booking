import { useToggleFeaturedItem } from '@/app/dashboard/_hooks/use-toggle-featured-item';

import { toggleCountryIsFeatured } from '../../../_actions';
import { type CurrentCountriesTableQKeys } from './use-countries-table';

interface UseToggleFeatureCountryProps {
  currentItemsKey: CurrentCountriesTableQKeys['countriesQueryKey'];
}

export const useToggleFeatureCountry = ({ currentItemsKey }: UseToggleFeatureCountryProps) => {
  return useToggleFeaturedItem({
    currentItemsKey,
    mutationFn: toggleCountryIsFeatured,
  });
};
