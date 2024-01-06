import { Checkbox } from '@/components/ui/checkbox';

export const CheckboxList = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="terms-1" />
        <label
          htmlFor="terms-1"
          className="text-sm font-medium leading-none tracking-wide text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-300"
        >
          BreakFast and dinner
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms-2" />
        <label
          htmlFor="terms-2"
          className="text-sm font-medium leading-none tracking-wide text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-300"
        >
          BreakFast and dinner
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms-3" />
        <label
          htmlFor="terms-3"
          className="text-sm font-medium leading-none tracking-wide text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-300"
        >
          BreakFast and dinner
        </label>
      </div>
    </div>
  );
};
