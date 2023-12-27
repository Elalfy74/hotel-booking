'use client';

import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useDebounce } from '@/hooks/use-debounce';
import { useDisclosure } from '@/hooks/use-disclosure';
import { cn } from '@/lib/utils';

export type ComboboxItemType = {
  value: string;
  label: string;
};

interface ComboboxProps {
  entityName: string;
  items: ComboboxItemType[];

  selected: ComboboxItemType | undefined;
  setSelected: (selected: ComboboxItemType | undefined) => void;

  setSearchChange: (value: string) => void;
  isFetching?: boolean;

  className?: string;
}

export function Combobox(props: ComboboxProps) {
  const { selected, setSelected, setSearchChange, items, entityName, isFetching, className } =
    props;

  const [open, { setOpened, close }] = useDisclosure(false);
  const [localValue, setLocalValue] = useDebounce({ onValueChange: setSearchChange });

  return (
    <Popover open={open} onOpenChange={setOpened}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            'w-[300px] justify-between',
            className,
            !selected && 'text-gray-400 hover:text-gray-400',
          )}
        >
          {selected ? selected.label : `Select ${entityName}...`}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn('min-w-[300px] p-0')}>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={`Search ${entityName}...`}
            className="h-9"
            value={localValue}
            onValueChange={setLocalValue}
          />
          <CommandEmpty>
            {isFetching ? (
              <span className="animate-pulse">Fetching {entityName}...</span>
            ) : (
              `No ${entityName} found`
            )}
          </CommandEmpty>

          {isFetching && !items.length && (
            <span className="py-6 text-center text-sm">Fetching {entityName}...</span>
          )}

          {!isFetching && (
            <CommandGroup>
              {items.map((item) => {
                const isSelected = selected?.value === item.value;

                return (
                  <CommandItem
                    key={item.value}
                    onSelect={() => {
                      setSelected(isSelected ? undefined : item);
                      close();
                    }}
                    className="capitalize"
                  >
                    {item.label}
                    <CheckIcon
                      className={cn('ml-auto h-4 w-4', isSelected ? 'opacity-100' : 'opacity-0')}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
