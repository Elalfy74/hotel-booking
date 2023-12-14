'use client';

import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import * as React from 'react';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export type ComboboxItemType = {
  value: string;
  label: string;
};

interface ComboboxProps {
  entityName: string;
  items: ComboboxItemType[];

  selected?: ComboboxItemType | null;
  setSelected: (selected: ComboboxItemType | null) => void;

  setSearchChange: (value: string) => void;
  isFetching?: boolean;

  className?: string;
}

export function Combobox(props: ComboboxProps) {
  const { selected, setSelected, setSearchChange, items, entityName, isFetching, className } =
    props;

  const [open, setOpen] = React.useState(false);
  const [localValue, setLocalValue] = React.useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchChange(localValue);
    }, 500);

    return () => clearTimeout(timeout);
  }, [localValue, setSearchChange]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('w-[300px] justify-between', className)}
        >
          {selected ? selected.label : `Select ${entityName}...`}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn('w-[300px] p-0', className)}>
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

          {!isFetching && (
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={() => {
                    setSelected(selected?.value === item.value ? null : item);
                    setOpen(false);
                  }}
                  className="capitalize"
                >
                  {item.label}
                  <CheckIcon
                    className={cn(
                      'ml-auto h-4 w-4',
                      selected?.value === item.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
