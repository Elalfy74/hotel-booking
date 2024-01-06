import { CheckboxList } from './checkbox-list';
import { FilterHeading } from './filter-heading';

export const PropertyType = () => {
  return (
    <div className="mt-6">
      <FilterHeading label="Property Type" />
      <CheckboxList />
      <a className="hover:text-primary-hover mt-3 block font-semibold text-primary hover:underline">
        See More
      </a>
    </div>
  );
};
