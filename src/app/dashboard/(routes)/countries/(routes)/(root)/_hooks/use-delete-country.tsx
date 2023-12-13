import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteCountryById } from '../../../_actions';
import { type CountriesTableKeys } from './use-countries-table';
import { reValidateAfterDelete } from './utils';

interface UseDeleteCountryProps {
  onSuccess: () => void;
  keys: CountriesTableKeys;
}

export const useDeleteCountry = ({ onSuccess, keys }: UseDeleteCountryProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCountryById,
    onSuccess: ({ error }) => {
      if (error) return toast.error(error);

      toast.success('Country deleted successfully');
      onSuccess();

      reValidateAfterDelete({ queryClient, keys });
    },
  });
};
