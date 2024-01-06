import { CheckboxList } from './checkbox-list';
import { FilterHeading } from './filter-heading';

export const YourBudget = () => {
  return (
    <div className="mt-6">
      <FilterHeading label="Your Budget" />
      <CheckboxList />
    </div>
  );
};
