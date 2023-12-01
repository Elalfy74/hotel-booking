import { Role } from '@prisma/client';
import { ShieldAlert, UserIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { DataTableFacetedFilter } from '@/components/ui/data-table-faceted-filter';
import { DataTableResetFilter } from '@/components/ui/data-table-reset-filter';
import { DataTableSearchFilter } from '@/components/ui/data-table-search-filter';

import { useUsersFilter } from '../_hooks/use-users-filter';

interface UsersFilterProps extends ReturnType<typeof useUsersFilter> {}

export const UsersFilter = (props: UsersFilterProps) => {
  const { setSearchValue, selectedRoles, setSelectedRoles, resetFilter } = props;

  const [value, setValue] = useState('');

  const isFiltering = value.length > 0 || selectedRoles.length > 0;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchValue(value);
    }, 500);

    return () => clearTimeout(timeout);
  }, [value, setSearchValue]);

  const reset = () => {
    setValue('');
    resetFilter();
  };

  return (
    <>
      <DataTableSearchFilter value={value} setValue={setValue} placeholder="Filter Users..." />

      <DataTableFacetedFilter
        title="Role"
        options={options}
        selectedValues={selectedRoles}
        onSelectedValuesChange={setSelectedRoles}
      />

      {isFiltering && <DataTableResetFilter reset={reset} />}
    </>
  );
};

const options: { label: string; value: Role; icon: React.ComponentType<{ className?: string }> }[] =
  [
    {
      label: 'USER',
      value: 'USER',
      icon: () => <UserIcon className="h-4 w-4" />,
    },
    {
      label: 'ADMIN',
      value: 'ADMIN',
      icon: () => <ShieldAlert className="h-4 w-4" />,
    },
  ];
