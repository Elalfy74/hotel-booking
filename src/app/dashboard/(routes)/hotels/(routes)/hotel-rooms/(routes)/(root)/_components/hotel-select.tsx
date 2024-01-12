import Link from 'next/link';
import { useState } from 'react';

import { type ComboboxItemType } from '@/components/combobox';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { Separator } from '@/components/ui/separator';
import { useDebounce } from '@/hooks/use-debounce';

import { useHotels } from '../../../../(root)/_hooks/use-hotels';

export function HotelSelect() {
  let items: ComboboxItemType[] = [];
  const [query, setQuery] = useState('');

  const { data, isFetching } = useHotels({
    currentPage: 1,
    pageSize: 10,
    filter: { query },
    slim: true,
  });

  if (data?.data) {
    items = data.data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  }

  const [localValue, setLocalValue] = useDebounce({ onValueChange: setQuery });

  return (
    <Command shouldFilter={false}>
      <CommandInput
        placeholder={`Search Hotel...`}
        className="h-9"
        value={localValue}
        onValueChange={setLocalValue}
      />
      <CommandEmpty>
        {isFetching ? <span className="animate-pulse">Fetching Hotel...</span> : `No Hotel found`}
      </CommandEmpty>

      {isFetching && !items.length && (
        <span className="py-6 text-center text-sm">Fetching Hotel...</span>
      )}

      {!isFetching && (
        <CommandGroup>
          {items.map((item, i) => {
            return (
              <>
                {i !== 0 && <Separator />}
                <CommandItem
                  key={item.value}
                  className="flex items-center justify-between capitalize"
                >
                  {item.label}
                  <Button size="sm" asChild>
                    <Link href={`/dashboard/hotels/${item.value}/rooms`}>Select</Link>
                  </Button>
                </CommandItem>
              </>
            );
          })}
        </CommandGroup>
      )}
    </Command>
  );
}
