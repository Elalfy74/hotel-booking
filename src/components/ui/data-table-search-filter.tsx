import { Input } from '@/components/ui/input';

interface DataTableSearchFilterProps {
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
}

export const DataTableSearchFilter = ({
  placeholder,
  value,
  setValue,
}: DataTableSearchFilterProps) => {
  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="h-8 w-[150px] lg:w-[250px]"
    />
  );
};
