import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteManyCountries } from '../../../_actions';
import { type CountriesTableKeys } from './use-countries-table';
import { reValidateAfterDelete } from './utils';

interface UseDeleteManyCountriesProps {
  onSuccess: () => void;
  keys: CountriesTableKeys;
}

export const useDeleteManyCountries = ({ onSuccess, keys }: UseDeleteManyCountriesProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteManyCountries,
    onSuccess: ({ error }, variables) => {
      if (error) return toast.error(error);

      toast.success('Countries deleted successfully');
      onSuccess();

      reValidateAfterDelete({ queryClient, keys, amount: variables.length });
    },
  });
};
