import {
  DeleteManyButton,
  type DeleteManyItemsButtonProps,
} from '@/app/dashboard/_components/delete-many-button';

import { useDeleteManyUsers } from '../_hooks/use-delete-many-users';
import { CurrentUserTableQKeys } from '../_hooks/use-users-table';

interface DeleteManyItemsButtonWithKeysProps extends DeleteManyItemsButtonProps {
  currentQKeys: CurrentUserTableQKeys;
}

export const deleteManyUsersButtonWithKeys = (currentQKeys: CurrentUserTableQKeys) => {
  return function DeleteButtonWithKeys(props: DeleteManyItemsButtonProps) {
    return <DeleteManyUsersButton currentQKeys={currentQKeys} {...props} />;
  };
};

const DeleteManyUsersButton = ({
  currentQKeys,
  ids,
  onDone,
}: DeleteManyItemsButtonWithKeysProps) => {
  const { mutateAsync, isPending } = useDeleteManyUsers({ currentQKeys });

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
