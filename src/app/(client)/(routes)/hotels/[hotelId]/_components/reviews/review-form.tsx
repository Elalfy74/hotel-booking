'use client';

import { Rating } from 'react-simple-star-rating';

import { Button } from '@/components/ui/button';

export const ReviewForm = () => {
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="mb-6 text-xl font-semibold md:text-4xl">Attach your Review</h1>
        <Rating size={30} />
      </div>
      <form>
        <textarea
          className="h-[150px] w-full resize-none rounded-lg border bg-gray-100 p-6 outline-none"
          placeholder="Write Your details review here.."
        />
        <div className="mt-4 flex justify-end gap-4">
          <Button variant="secondary">Cancel</Button>
          <Button>Submit</Button>
        </div>
      </form>
    </div>
  );
};
