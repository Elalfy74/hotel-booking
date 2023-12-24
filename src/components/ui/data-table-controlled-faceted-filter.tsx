'use client';

import { CheckIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import { type ComboboxItemType } from '../combobox';
import { Badge } from './badge';
import { Button } from './button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from './command';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Separator } from './separator';

interface ControllerFilterProps {
  entityName: string;
  items: ComboboxItemType[];

  selectedValues: ComboboxItemType[];
  setValues: (selected: ComboboxItemType[]) => void;

  setSearchChange: (value: string) => void;
  isFetching?: boolean;

  className?: string;
}

export const DataTableControlledFacetedFilter = (props: ControllerFilterProps) => {
  const { selectedValues, setValues, setSearchChange, items, entityName, isFetching, className } =
    props;

  const [localValue, setLocalValue] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchChange(localValue);
    }, 500);

    return () => clearTimeout(timeout);
  }, [localValue, setSearchChange]);

  const handleSelect = (item: ComboboxItemType, isSelected: boolean) => {
    if (isSelected) {
      setValues(selectedValues.filter((v) => v.value !== item.value));
    } else {
      setValues([...selectedValues, item]);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          {entityName}
          {selectedValues && selectedValues.length > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
                {selectedValues.length}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.length > 2 ? (
                  <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                    {selectedValues.length} selected
                  </Badge>
                ) : (
                  selectedValues.map((item) => (
                    <Badge
                      variant="secondary"
                      key={item.value}
                      className="rounded-sm px-1 font-normal"
                    >
                      {item.label}
                    </Badge>
                  ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn('w-[200px] p-0', className)}>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={`Search ${entityName}...`}
            className="h-9"
            value={localValue}
            onValueChange={setLocalValue}
          />
          <CommandList>
            <CommandEmpty>
              {isFetching ? (
                <span className="animate-pulse">Fetching {entityName}...</span>
              ) : (
                `No ${entityName} found`
              )}
            </CommandEmpty>
            {!isFetching && (
              <CommandGroup>
                {items.map((item) => {
                  const isSelected = selectedValues.some((v) => v.value === item.value);

                  return (
                    <CommandItem
                      key={item.value}
                      onSelect={() => handleSelect(item, isSelected)}
                      className="capitalize"
                    >
                      <div
                        className={cn(
                          'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                          isSelected
                            ? 'bg-primary text-primary-foreground'
                            : 'opacity-50 [&_svg]:invisible',
                        )}
                      >
                        <CheckIcon className={cn('h-4 w-4')} />
                      </div>
                      <span>{item.label}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            )}
            {!isFetching && selectedValues.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => setValues([])}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
