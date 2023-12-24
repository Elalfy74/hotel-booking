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
  const { setSearchValue, selectedRoles, setSelectedRoles, resetFilter, resetPage } = props;

  const onSearchValueChange = useCallback(
    (value: string) => {
      setSearchValue(value);
      resetPage();
    },
    [setSearchValue, resetPage],
  );

  const [value, setValue] = useDebounce({ onValueChange: onSearchValueChange });

  const isFiltering = value.length > 0 || selectedRoles.length > 0;

  const handleSelectedRolesChange = useCallback(
    (selectedRoles: Role[]) => {
      setSelectedRoles(selectedRoles);
      resetPage();
    },
    [setSelectedRoles, resetPage],
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
        selectedValues={selectedRoles}
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
