import { Role } from '@prisma/client';
import { ShieldAlertIcon, UserIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { DataTableFacetedFilter, FacetedOption } from '@/components/ui/data-table-faceted-filter';
import { DataTableResetFilter } from '@/components/ui/data-table-reset-filter';
import { DataTableSearchFilter } from '@/components/ui/data-table-search-filter';

import { useUsersFilter } from '../_hooks/use-users-filter';

interface UsersFilterProps extends ReturnType<typeof useUsersFilter> {
  resetPage: () => void;
}

export const UsersFilter = (props: UsersFilterProps) => {
  const { setSearchValue, selectedRoles, setSelectedRoles, resetFilter, resetPage } = props;

  const [value, setValue] = useState('');
  const isFiltering = value.length > 0 || selectedRoles.length > 0;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchValue(value);
      resetPage();
    }, 500);

    return () => clearTimeout(timeout);
  }, [value, setSearchValue, resetPage]);

  const handleValueChange = (value: string) => {
    setValue(value);
  };

  const handleSelectedRolesChange = (selectedRoles: Role[]) => {
    setSelectedRoles(selectedRoles);
    resetPage();
  };

  const reset = () => {
    setValue('');
    resetFilter();
    resetPage();
  };

  return (
    <>
      <DataTableSearchFilter
        value={value}
        setValue={handleValueChange}
        placeholder="Filter Users..."
      />

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
