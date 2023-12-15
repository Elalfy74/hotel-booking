import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteCityById } from '../../../_actions';
import { CitiesTableKeys } from './use-cities-table';

interface UseDeleteCityProps {
  keys: CitiesTableKeys;
}

// TODO: revalidate after delete
export const useDeleteCity = ({ keys }: UseDeleteCityProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCityById,
    onSuccess: ({ error }) => {
      if (error) return toast.error(error);

      toast.success('City deleted successfully');

      // reValidateAfterDelete({ queryClient, keys });
    },
  });
};
