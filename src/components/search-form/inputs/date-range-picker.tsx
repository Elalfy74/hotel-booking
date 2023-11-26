'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';
import { DateRange } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export function DatePickerWithRange() {
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);

  const displayDate = React.useMemo(() => {
    if (!date) return 'Pick a date';

    if (date.from) {
      if (date.to) {
        return `${format(date.from, 'LLL dd, y')} - ${format(date.to, 'LLL dd, y')}`;
      }

      return format(date.from, 'LLL dd, y');
    }
  }, [date]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant={'outline'}
          className={cn(
            'w-full justify-start bg-gray-50 py-6 text-left font-normal focus-visible:bg-white focus-visible:bg-none dark:bg-background',
            !date && 'font-normal text-gray-400 hover:text-gray-400',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {displayDate}

          <div className="flex flex-1 justify-end">
            <ChevronsUpDown className="ml-2 h-4 w-4  shrink-0 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="center">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
          fromDate={new Date()}
          toMonth={new Date(new Date().setMonth(new Date().getMonth() + 3))}
          pagedNavigation
          fixedWeeks
        />
      </PopoverContent>
    </Popover>
  );
}
