import { Cross2Icon } from '@radix-ui/react-icons';

import { Button } from './button';

interface DataTableResetFilterProps {
  reset: () => void;
}
export const DataTableResetFilter = ({ reset }: DataTableResetFilterProps) => {
  return (
    <Button variant="ghost" onClick={reset} className="h-8 px-2 lg:px-3">
      Reset
      <Cross2Icon className="ml-2 h-4 w-4" />
    </Button>
  );
};
