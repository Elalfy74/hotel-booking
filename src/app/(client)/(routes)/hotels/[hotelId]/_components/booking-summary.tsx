import { DateInput } from '@/components/search-form/inputs/date-input';
import { PassengersInput } from '@/components/search-form/inputs/passengers-input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

import { PricePerNight } from './price-per-night';

function PriceSummary() {
  return (
    <div className="mt-5">
      <h4>Price</h4>
      <ul className="rounded-xl bg-gray-200 p-5 dark:border dark:bg-background">
        {new Array(4).fill('').map((item, i) => (
          <li key={i} className="mb-4 flex items-center justify-between capitalize ">
            <span>1 nights</span>
            <span>$500</span>
          </li>
        ))}
      </ul>
      <div className="my-5 flex items-center justify-between">
        <span>Total Payments</span>
        <span>$300</span>
      </div>
      <Button className="w-full" size="lg">
        Book Now
      </Button>
    </div>
  );
}

export const BookingSummary = () => {
  return (
    <div className="w-full rounded-xl border px-5 py-6 shadow-sm xl:px-10">
      {/* Heading */}
      <div className="mb-5 flex items-center justify-between">
        <PricePerNight price={148} originalPrice={155} />
        <p className="rounded-full bg-primary p-2 text-sm uppercase text-white">20% off</p>
      </div>
      <div className="space-y-5">
        <DateInput />
        <PassengersInput />
      </div>
      <div className="mt-5">
        <h2 className="mb-4 text-lg font-semibold">Extra Features</h2>
        <div className="space-y-4 rounded-lg border p-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="terms-1" />
            <label
              htmlFor="terms-1"
              className="leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              BreakFast and dinner
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms-2" />
            <label
              htmlFor="terms-2"
              className="leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              BreakFast and dinner
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms-3" />
            <label
              htmlFor="terms-3"
              className="leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              BreakFast and dinner
            </label>
          </div>
        </div>
      </div>
      <PriceSummary />
    </div>
  );
};
