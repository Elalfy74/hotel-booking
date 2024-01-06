'use client';

import { useHotels } from '../_hooks/use-hotels';
import { SingleHotel } from './single-hotel';

export const HotelList = () => {
  const { data: hotels } = useHotels();

  return (
    <div className="mt-10 flex flex-col gap-20">
      {hotels?.map((hotel) => <SingleHotel key={hotel.id} hotel={hotel} />)}
    </div>
  );
};
