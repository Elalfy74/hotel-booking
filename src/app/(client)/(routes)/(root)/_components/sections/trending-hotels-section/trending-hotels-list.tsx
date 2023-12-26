import { SectionHeading } from '../../section-heading';
import { TrendingHotelsItem } from './trending-hotels-item';
import { type ITrendingHotel } from './trending-hotels-section';

export const TrendingHotelsList = ({ hotels }: { hotels: ITrendingHotel[] }) => {
  return (
    <>
      <SectionHeading title="Trending Hotels" desc="The most searched hotels on TripGuide" />
      <div className="grid grid-cols-1 gap-8 md:gap-10 lg:grid-cols-2">
        {hotels.map((hotel) => (
          <TrendingHotelsItem key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </>
  );
};
