'use client';

import { useState } from 'react';
import { DateRange } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { useMobileDetector } from '@/hooks/use-mobile-detector';

import { DatePicker } from './date-picker';
import { DateRangePicker } from './date-range-picker';

const PlaceholderButton = () => (
  <Button
    type="button"
    variant="outline"
    className="w-full cursor-default justify-start bg-gray-50 py-6 text-left font-normal text-gray-400 hover:text-gray-500 focus-visible:bg-white focus-visible:bg-none dark:bg-background"
  >
    Pick a date
  </Button>
);

export const DateInput = () => {
  const isMobile = useMobileDetector();
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: undefined,
  });

  const handleFromDateChange = (from?: Date) => {
    if (from && date?.to && from > date.to) {
      setDate({ from, to: undefined });
    } else {
      setDate((prev) => ({ ...prev, from }));
    }
  };

  const handleToDateChange = (to?: Date) => {
    if (to && date?.from && to < date.from) {
      setDate({ from: undefined, to });
      return;
    }
    if (date && date.from) {
      setDate({ from: date.from, to });
    } else {
      setDate({ from: undefined, to });
    }
  };

  if (isMobile === null) {
    return <PlaceholderButton />;
  }

  return (
    <>
      {isMobile ? (
        <div className="flex w-full flex-col gap-5">
          <DatePicker placeholder="Start Date" date={date?.from} setDate={handleFromDateChange} />
          <DatePicker placeholder="End Date" date={date?.to} setDate={handleToDateChange} />
        </div>
      ) : (
        <DateRangePicker setDate={setDate} date={date} />
      )}
    </>
  );
};
