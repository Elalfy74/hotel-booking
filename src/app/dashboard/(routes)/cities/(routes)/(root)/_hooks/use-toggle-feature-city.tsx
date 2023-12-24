import { useToggleFeaturedItem } from '@/app/dashboard/_hooks/use-toggle-featured-item';

import { toggleCityIsFeatured } from '../../../_actions';
import { type CitiesTableKeys } from './use-cities-table';

interface UseToggleFeatureCityProps {
  currentItemsKey: CitiesTableKeys['citiesQueryKey'];
}

export const useToggleFeatureCity = ({ currentItemsKey }: UseToggleFeatureCityProps) => {
  return useToggleFeaturedItem({
    currentItemsKey,
    mutationFn: toggleCityIsFeatured,
  });
};
