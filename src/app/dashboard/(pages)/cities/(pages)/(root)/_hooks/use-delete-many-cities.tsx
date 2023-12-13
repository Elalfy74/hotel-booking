import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteManyCities } from '../../../_actions';
import { CitiesTableKeys } from './use-cities-table';

interface UseDeleteManyCitiesProps {
  onSuccess: () => void;
  keys: CitiesTableKeys;
}

export const useDeleteManyCities = ({ onSuccess, keys }: UseDeleteManyCitiesProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteManyCities,
    onSuccess: ({ error }, variables) => {
      if (error) return toast.error(error);

      toast.success('Cities deleted successfully');
      onSuccess();

      // reValidateAfterDelete({ queryClient, keys, amount: variables.length });
    },
  });
};
