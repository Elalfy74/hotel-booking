import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

import { Facilities } from './facilities-checkbox-list';
import { PopularFilter } from './popular-checkbox-list';
import { PriceRange } from './price-range';
import { PropertyType } from './property-type';
import { YourBudget } from './your-budge';

export const Filter = () => {
  return (
    <>
      <h4 className="mb-2 text-lg font-medium">Search location or property</h4>
      <Input
        type="text"
        className="h-10 w-[80%] bg-white transition-all duration-300 focus:w-full dark:bg-transparent"
        placeholder="Search location or property"
        autoFocus={false}
      />
      <PopularFilter />
      <Separator className="my-4" />
      <PriceRange />
      <Separator className="my-4" />
      <PropertyType />
      <Separator className="my-4" />
      <YourBudget />
      <Separator className="my-4" />
      <Facilities />
    </>
  );
};
