import { DeleteManyButton } from '@/app/dashboard/_components/delete-many-button';
import { useDisclosure } from '@/hooks/use-disclosure';

import { useDeleteManyUsers } from '../_hooks/use-delete-many-users';
import { UserTableKeys } from '../_hooks/use-users-table';

export interface DeleteManyButtonProps {
  ids: string[];
  onDone: () => void;
}

interface DeleteManyButtonWithKeysProps extends DeleteManyButtonProps {
  keys: UserTableKeys;
}

export const deleteManyUsersButtonWithKeys = (keys: UserTableKeys) => {
  return function DeleteButtonWithKeys(props: DeleteManyButtonProps) {
    return <DeleteManyUsersButton keys={keys} {...props} />;
  };
};

const DeleteManyUsersButton = ({ keys, ids, onDone }: DeleteManyButtonWithKeysProps) => {
  // For the AlertDialog
  const [opened, { close, setOpened }] = useDisclosure();

  const { mutate, isPending } = useDeleteManyUsers({
    keys,
    onSuccess: () => {
      close();
      onDone();
    },
  });

  const onDelete = () => mutate(ids);

  return (
    <DeleteManyButton
      opened={opened}
      setOpened={setOpened}
      isDisabled={ids.length === 0}
      isPending={isPending}
      onDelete={onDelete}
    />
  );
};
