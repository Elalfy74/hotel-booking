import { type Role } from '@prisma/client';
import { useState } from 'react';

export const useUsersFilter = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);

  const resetFilter = () => {
    if (searchValue.length > 0) setSearchValue('');
    if (selectedRoles.length > 0) setSelectedRoles([]);
  };

  return {
    searchValue,
    setSearchValue,
    selectedRoles,
    setSelectedRoles,
    resetFilter,
  };
};
