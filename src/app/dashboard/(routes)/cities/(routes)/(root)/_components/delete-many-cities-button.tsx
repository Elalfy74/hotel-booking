import {
  DeleteManyButton,
  type DeleteManyItemsButtonProps,
} from '@/app/dashboard/_components/delete-many-button';

import { type CitiesTableKeys } from '../_hooks/use-cities-table';
import { useDeleteManyCities } from '../_hooks/use-delete-many-cities';

interface DeleteManyButtonWithKeysProps extends DeleteManyItemsButtonProps {
  currentQKeys: CitiesTableKeys;
}

export const deleteManyCitiesButtonWithKeys = (currentQKeys: CitiesTableKeys) => {
  return function DeleteButtonWithKeys(props: DeleteManyItemsButtonProps) {
    return <DeleteManyCitiesButton currentQKeys={currentQKeys} {...props} />;
  };
};

const DeleteManyCitiesButton = ({ currentQKeys, ids, onDone }: DeleteManyButtonWithKeysProps) => {
  const { mutateAsync, isPending } = useDeleteManyCities({ currentQKeys });

  return (
    <DeleteManyButton
      isDisabled={ids.length === 0}
      isPending={isPending}
      onDelete={() => {
        mutateAsync(ids).then(({ error }) => {
          if (!error) {
            onDone();
          }
        });
      }}
    />
  );
};
