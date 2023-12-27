import dynamic from 'next/dynamic';

import { FeaturedDestinationsSection } from './_components/sections';
import { FeaturedCitiesSection } from './_components/sections/featured-cities-section/featured-cities-section';
import { HeroSection } from './_components/sections/hero-section/hero-section';

const TopToursSection = dynamic(
  () => import('./_components/sections').then((mod) => mod.TopToursSection),
  {
    ssr: false,
  },
);
const ExploreTheWorldSection = dynamic(() =>
  import('./_components/sections').then((mod) => mod.ExploreTheWorldSection),
);
const TrendingHotelsSection = dynamic(() =>
  import('./_components/sections').then((mod) => mod.TrendingHotelsSection),
);
const ContactBanner = dynamic(() =>
  import('../../_components/contact-banner').then((mod) => mod.ContactBanner),
);

export default async function Home() {
  return (
    <main className="min-h-screen w-full">
      <section>
        <HeroSection />
      </section>
      <div className="bg-gray-50 dark:bg-transparent">
        <section className="pt-40 lg:pt-52">
          <FeaturedCitiesSection />
        </section>
        <FeaturedDestinationsSection />
        <TopToursSection />
        <ExploreTheWorldSection />
        <TrendingHotelsSection />
        <ContactBanner />
      </div>
    </main>
  );
}
