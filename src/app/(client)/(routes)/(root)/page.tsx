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
      <section className="pt-52">
        <FeaturedCitiesSection />
      </section>
      <FeaturedDestinationsSection />
      <TopToursSection />
      <ExploreTheWorldSection />
      <div className="bg-gray-100 dark:bg-background">
        <TrendingHotelsSection />
      </div>
      <ContactBanner />
    </main>
  );
}
