import { ChevronsUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

import { SinglePassengerInput } from './single-passenger-input';

export const PassengersInput = () => {
  // const label = `Adults ${passengers['Adults']} / Children ${passengers['Children']} / Infants ${passengers['Infants']}`;
  const data = null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start bg-gray-50 py-6 text-left font-normal focus-visible:bg-white focus-visible:bg-none dark:bg-background',
            !data && 'font-normal text-gray-400 hover:text-gray-400',
          )}
        >
          {data || 'Passengers'}

          <div className="flex flex-1 justify-end">
            <ChevronsUpDown className="ml-2 h-4 w-4  shrink-0 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent asChild>
        <div className="px-10 py-6">
          {arrOfPassengers.map((item) => (
            <SinglePassengerInput
              key={item.title}
              passengerTitle={item.title}
              passengerDesc={item.desc}
              passenger={0}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export const arrOfPassengers = [
  {
    title: 'Adults',
    desc: 'Ages 13 or above',
  },
  { title: 'Children', desc: 'Ages 2-12' },
  { title: 'Infants', desc: 'Under 2' },
];
