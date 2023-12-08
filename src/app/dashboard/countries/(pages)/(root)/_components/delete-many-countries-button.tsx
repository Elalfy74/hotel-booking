import { DeleteManyButton } from '@/app/dashboard/_components/delete-many-button';
import { useDisclosure } from '@/hooks/use-disclosure';

import { type CountriesTableKeys } from '../_hooks/use-countries-table';
import { useDeleteManyCountries } from '../_hooks/use-delete-many-countries';

export interface DeleteManyButtonProps {
  ids: string[];
  onDone: () => void;
}

interface DeleteManyButtonWithKeysProps extends DeleteManyButtonProps {
  keys: CountriesTableKeys;
}

export const deleteManyCountriesButtonWithKeys = (keys: CountriesTableKeys) => {
  return function DeleteButtonWithKeys(props: DeleteManyButtonProps) {
    return <DeleteManyCountriesButton keys={keys} {...props} />;
  };
};

const DeleteManyCountriesButton = ({ keys, ids, onDone }: DeleteManyButtonWithKeysProps) => {
  // For the AlertDialog
  const [opened, { close, setOpened }] = useDisclosure();

  const { mutate, isPending } = useDeleteManyCountries({
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
