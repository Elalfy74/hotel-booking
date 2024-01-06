import { Stars } from '@/components/stars';
import { Card } from '@/components/ui/card';

import { Reviewer } from './reviewer';

export const SingleReview = () => {
  return (
    <Card className="flex flex-col justify-between gap-4 px-5 py-6 sm:flex-row">
      <Reviewer />
      <ReviewContent />
    </Card>
  );
};

const ReviewContent = () => {
  return (
    <div className="sm:w-[60%]">
      <div className="mb-6 flex items-end gap-4">
        <Stars stars={3} />
        <span className="text-mainGray text-xs">26.5.2020</span>
      </div>
      <p className="text-gray-500">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi quaerat, a facere
        dignissimos, odit quod voluptate quisquam modi qui laudantium aspernatu
      </p>
    </div>
  );
};
