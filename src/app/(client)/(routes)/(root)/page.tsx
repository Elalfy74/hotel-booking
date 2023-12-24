import { FeaturedCitiesSection } from './_components/featured-cities-section/featured-cities-section';
import { FeaturedDestinationsSection } from './_components/featured-destinations-section/featured-destinations-section';
import { HeroSection } from './_components/hero-section/hero-section';
import { TopTourSection } from './_components/top-tour-section/top-tour-section';

export default async function Home() {
  return (
    <main className="min-h-screen w-full">
      <section>
        <HeroSection />
      </section>
      <section className="bg-gray-50 pb-16 pt-40 dark:bg-transparent lg:pt-52">
        <FeaturedCitiesSection />
        <FeaturedDestinationsSection />
        <TopTourSection />
      </section>
    </main>
  );
}
