'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';

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

interface ComboboxProps {
  data: { value: string; label: string }[];
  placeholder: string;
  emptyMsg: string;
  displayValue: string | null;
  value: string | undefined;
  setValue: (value: string | null) => void;
}

export const Combobox = (props: ComboboxProps) => {
  const [open, setOpen] = useState(false);

  const { data, placeholder, emptyMsg, displayValue, value, setValue } = props;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            'w-full justify-between bg-gray-50 py-6 font-normal focus-visible:bg-white focus-visible:bg-none dark:bg-background',
            !displayValue && 'text-gray-400 hover:text-gray-400',
          )}
        >
          {displayValue || placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command
          filter={(value, search) => {
            const labelOfValue = data.find((item) => item.value === value)?.label;

            if (!labelOfValue) return 0;

            if (labelOfValue.toLowerCase().includes(search.toLowerCase())) return 1;

            return 0;
          }}
        >
          <CommandInput placeholder={placeholder} />
          <CommandEmpty>{emptyMsg}</CommandEmpty>
          <CommandGroup>
            {data.map((item) => (
              <CommandItem
                key={item.value}
                value={item.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? null : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn('mr-2 h-4 w-4', value === item.value ? 'opacity-100' : 'opacity-0')}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
