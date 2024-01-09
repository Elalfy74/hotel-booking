import { useToggleFeaturedItem } from '@/app/dashboard/_hooks/use-toggle-featured-item';

import { toggleHotelIsFeatured } from '../../../_actions';
import { HotelsTableKeys } from './use-hotels-table';

interface UseToggleFeatureHotelProps {
  currentItemsKey: HotelsTableKeys['hotelsQueryKey'];
}

export const useToggleFeatureHotel = ({ currentItemsKey }: UseToggleFeatureHotelProps) => {
  return useToggleFeaturedItem({
    currentItemsKey,
    mutationFn: toggleHotelIsFeatured,
  });
};
