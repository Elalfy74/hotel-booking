import { memo } from 'react';

import { Input } from '@/components/ui/input';

interface DataTableSearchFilterProps {
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
}

export const DataTableSearchFilter = memo(NotMemorizedDataTableSearchFilter);
export function NotMemorizedDataTableSearchFilter({
  placeholder,
  value,
  setValue,
}: DataTableSearchFilterProps) {
  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="h-8 w-[150px] lg:w-[250px]"
    />
  );
}
