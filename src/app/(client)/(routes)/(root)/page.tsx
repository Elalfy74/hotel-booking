import { ContactBanner } from '../../_components/contact-banner';
import {
  ExploreTheWorldSection,
  FeaturedCitiesSection,
  FeaturedDestinationsSection,
  HeroSection,
  TopToursSection,
  TrendingHotelsSection,
} from './_components/sections';

export default async function Home() {
  return (
    <main className="min-h-screen w-full">
      <HeroSection />
      <div className="bg-gray-50 dark:bg-transparent">
        <section className="pt-52">
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
