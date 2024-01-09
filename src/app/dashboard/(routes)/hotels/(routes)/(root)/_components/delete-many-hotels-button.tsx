import {
  DeleteManyButton,
  type DeleteManyItemsButtonProps,
} from '@/app/dashboard/_components/delete-many-button';

import { useDeleteManyHotels } from '../_hooks/use-delete-many-hotels';
import { type HotelsTableKeys } from '../_hooks/use-hotels-table';

interface DeleteManyButtonWithKeysProps extends DeleteManyItemsButtonProps {
  currentQKeys: HotelsTableKeys;
}

export const deleteManyHotelsButtonWithKeys = (currentQKeys: HotelsTableKeys) => {
  return function DeleteButtonWithKeys(props: DeleteManyItemsButtonProps) {
    return <DeleteManyHotelsButton currentQKeys={currentQKeys} {...props} />;
  };
};

const DeleteManyHotelsButton = ({ currentQKeys, ids, onDone }: DeleteManyButtonWithKeysProps) => {
  const { mutateAsync, isPending } = useDeleteManyHotels({ currentQKeys });

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
