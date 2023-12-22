import {
  DeleteManyButton,
  type DeleteManyItemsButtonProps,
} from '@/app/dashboard/_components/delete-many-button';

import { type CurrentCountriesTableQKeys } from '../_hooks/use-countries-table';
import { useDeleteManyCountries } from '../_hooks/use-delete-many-countries';

interface DeleteManyButtonWithKeysProps extends DeleteManyItemsButtonProps {
  currentQKeys: CurrentCountriesTableQKeys;
}

export const deleteManyCountriesButtonWithKeys = (currentQKeys: CurrentCountriesTableQKeys) => {
  return function DeleteButtonWithKeys(props: DeleteManyItemsButtonProps) {
    return <DeleteManyCountriesButton currentQKeys={currentQKeys} {...props} />;
  };
};

const DeleteManyCountriesButton = ({
  currentQKeys,
  ids,
  onDone,
}: DeleteManyButtonWithKeysProps) => {
  const { mutateAsync, isPending } = useDeleteManyCountries({ currentQKeys });

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
