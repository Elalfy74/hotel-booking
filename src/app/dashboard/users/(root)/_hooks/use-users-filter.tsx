import { Role } from '@prisma/client';
import { useState } from 'react';

export const useUsersFilter = () => {
  const [searchValue, setSearchValue] = useState('');

  const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);

  const resetFilter = () => {
    setSearchValue('');
    setSelectedRoles([]);
  };

  return {
    searchValue,
    setSearchValue,
    selectedRoles,
    setSelectedRoles,
    resetFilter,
  };
};
