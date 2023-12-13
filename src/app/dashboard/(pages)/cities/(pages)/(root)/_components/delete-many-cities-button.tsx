import { DeleteManyButton } from '@/app/dashboard/_components/delete-many-button';
import { useDisclosure } from '@/hooks/use-disclosure';

import { type CitiesTableKeys } from '../_hooks/use-cities-table';
import { useDeleteManyCities } from '../_hooks/use-delete-many-cities';

export interface DeleteManyButtonProps {
  ids: string[];
  onDone: () => void;
}

interface DeleteManyButtonWithKeysProps extends DeleteManyButtonProps {
  keys: CitiesTableKeys;
}

export const deleteManyCitiesButtonWithKeys = (keys: CitiesTableKeys) => {
  return function DeleteButtonWithKeys(props: DeleteManyButtonProps) {
    return <DeleteManyCitiesButton keys={keys} {...props} />;
  };
};

const DeleteManyCitiesButton = ({ keys, ids, onDone }: DeleteManyButtonWithKeysProps) => {
  // For the AlertDialog
  const [opened, { close, setOpened }] = useDisclosure();

  const { mutate, isPending } = useDeleteManyCities({
    keys,
    onSuccess: () => {
      close();
      onDone();
    },
  });

  return (
    <DeleteManyButton
      opened={opened}
      setOpened={setOpened}
      isDisabled={ids.length === 0}
      isPending={isPending}
      onDelete={() => mutate(ids)}
    />
  );
};
