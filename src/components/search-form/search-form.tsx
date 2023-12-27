import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { CityInput } from './inputs/city-input';
import { DateInput } from './inputs/date-input';
import { PassengersInput } from './inputs/passengers-input';

export const SearchForm = () => {
  return (
    <form>
      <Card className="flex w-full flex-col flex-wrap justify-between gap-5 p-6 lg:flex-row lg:px-16 lg:py-10">
        <div className="flex-1">
          <CityInput />
        </div>

        <div className="flex-1">
          <DateInput />
        </div>

        <div className="flex-1">
          <PassengersInput />
        </div>
        <Button type="submit" size="lg" className="py-6">
          Search
        </Button>
      </Card>
    </form>
  );
};
