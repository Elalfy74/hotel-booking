import { Button } from './button';
import { FacetedOption } from './data-table-faceted-filter';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './dropdown-menu';

interface DataTableSelectFilterProps<T> {
  options: FacetedOption<T>[];
  selectedValue: T | undefined;
  onSelectedValueChange: (selectedValue: T) => void;
}

export function DataTableSelectFilter<T>(props: DataTableSelectFilterProps<T>) {
  let buttonLabel = <span>Select a filter ...</span>;

  if (props.selectedValue !== undefined) {
    const selectedOption = props.options.find((option) => option.value === props.selectedValue);
    if (selectedOption) {
      buttonLabel = (
        <>
          <selectedOption.icon className="mr-2 h-4 w-4" /> {selectedOption.label}
        </>
      );
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          {buttonLabel}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[5rem]">
        {props.options.map(({ label, value, icon: Icon }) => (
          <DropdownMenuCheckboxItem
            key={label}
            checked={props.selectedValue === value}
            onCheckedChange={() => props.onSelectedValueChange(value)}
            className="px-3 py-2 "
          >
            <Icon className="mr-2 h-4 w-4" />
            <span>{label}</span>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
