import { Role } from '@prisma/client';
import { ShieldAlertIcon, UserIcon } from 'lucide-react';
import { useCallback } from 'react';

import { DataTableFacetedFilter, FacetedOption } from '@/components/ui/data-table-faceted-filter';
import { DataTableResetFilter } from '@/components/ui/data-table-reset-filter';
import { DataTableSearchFilter } from '@/components/ui/data-table-search-filter';
import { useDebounce } from '@/hooks/use-debounce';

import { useUsersFilter } from '../_hooks/use-users-filter';

interface UsersFilterProps extends ReturnType<typeof useUsersFilter> {
  resetPage: () => void;
}

export const UsersFilter = (props: UsersFilterProps) => {
  const { filter, setQ, setUsersRoles, resetFilter, resetPage } = props;

  const onSearchValueChange = useCallback(
    (value: string) => {
      if (value === filter.query) {
        return;
      }
      resetPage();
      setQ(value);
    },
    [setQ, resetPage, filter.query],
  );

  const [value, setValue] = useDebounce({ onValueChange: onSearchValueChange });

  const isFiltering = value.length > 0 || !!filter.roles?.length;

  const handleSelectedRolesChange = useCallback(
    (selectedRoles: Role[]) => {
      resetPage();
      setUsersRoles(selectedRoles);
    },
    [setUsersRoles, resetPage],
  );

  const reset = () => {
    setValue('');
    resetFilter();
    resetPage();
  };

  return (
    <>
      <DataTableSearchFilter value={value} setValue={setValue} placeholder="Filter Users..." />

      <DataTableFacetedFilter
        title="Role"
        options={options}
        selectedValues={filter.roles ?? []}
        onSelectedValuesChange={handleSelectedRolesChange}
      />

      {isFiltering && <DataTableResetFilter reset={reset} />}
    </>
  );
};

const options: FacetedOption<Role>[] = [
  {
    label: 'USER',
    value: 'USER',
    icon: UserIcon,
  },
  {
    label: 'ADMIN',
    value: 'ADMIN',
    icon: ShieldAlertIcon,
  },
];
