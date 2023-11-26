import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { CityInput } from './inputs/city-input';
import { DatePickerWithRange } from './inputs/date-range-picker';
import { PassengersInput } from './inputs/passengers-input';

export const SearchForm = () => {
  return (
    <form>
      <Card className="flex w-full flex-col flex-wrap justify-between gap-5 p-6 lg:flex-row lg:px-16 lg:py-10">
        <div className="relative flex-1">
          <CityInput />
        </div>

        <div className="relative flex-1">
          <DatePickerWithRange />
        </div>

        <div className="relative flex-1">
          <PassengersInput />
        </div>
        <Button type="submit" size="lg" className="py-6">
          Search
        </Button>
      </Card>
    </form>
  );
};
