import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';

import { FilterHeading } from './filter-heading';

export const PriceRange = () => {
  return (
    <div>
      <FilterHeading label="Price range" />
      <div className="flex gap-4">
        <Slider defaultValue={[50]} max={100} step={1} />
        <Input
          type="number"
          min={50}
          max={150}
          defaultValue="60"
          className="w-14 rounded-xl text-center"
        />
      </div>
      <div className="mt-1 flex w-full items-center justify-between font-medium">
        <p>50$</p>
        <p>150$</p>
      </div>
    </div>
  );
};
