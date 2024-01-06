import { CheckboxList } from './checkbox-list';
import { FilterHeading } from './filter-heading';

export const PopularFilter = () => {
  return (
    <div className="mt-6">
      <FilterHeading label="Popular Filter" />
      <CheckboxList />
      <a className="hover:text-primary-hover mt-3 block font-semibold text-primary hover:underline">
        See More
      </a>
    </div>
  );
};
