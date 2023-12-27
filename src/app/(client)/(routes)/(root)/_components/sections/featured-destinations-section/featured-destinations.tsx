import { SectionHeading } from '../../section-heading';
import { type IFeaturedDestination } from '..';
import { Backdrop } from './backdrop';
import { DestinationView } from './destination-view';

export const FeaturedDestinations = ({
  destinations,
}: {
  destinations: IFeaturedDestination[];
}) => {
  return (
    <section className="section">
      <SectionHeading title="Featured Destinations" desc="Popular destinations open to visitors" />
      <div className="relative grid h-auto grid-cols-1 gap-6 md:h-[600px] md:grid-cols-3 md:grid-rows-9">
        {destinations.map((destination) => (
          <DestinationView key={destination.id} destination={destination} />
        ))}
      </div>
      <Backdrop />
    </section>
  );
};
