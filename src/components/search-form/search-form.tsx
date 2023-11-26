import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { CityInput } from './inputs/city-input';
import { DatePickerWithRange } from './inputs/date-range-picker';
import { PassengersInput } from './inputs/passengers-input';

export const SearchForm = () => {
  return (
    <form className="container">
      <Card className="flex flex-col flex-wrap justify-between gap-5 p-6 md:px-16 md:py-10 lg:flex-row">
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
