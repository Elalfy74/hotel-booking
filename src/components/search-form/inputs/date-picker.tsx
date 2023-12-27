import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface DatePickerProps {
  placeholder: string;
  date?: Date;
  setDate: (date?: Date) => void;
}

export const DatePicker = (props: DatePickerProps) => {
  const { placeholder, date, setDate } = props;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start bg-gray-50 py-6 text-left font-normal focus-visible:bg-white focus-visible:bg-none dark:bg-background',
            !date && 'font-normal text-gray-400 hover:text-gray-400',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          defaultMonth={date}
          fromDate={new Date()}
          toMonth={new Date(new Date().setMonth(new Date().getMonth() + 3))}
          selected={date}
          onSelect={setDate}
          pagedNavigation
          fixedWeeks
        />
      </PopoverContent>
    </Popover>
  );
};
