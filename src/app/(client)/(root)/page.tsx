import { FeaturedCitiesSection } from './_components/featured-cities-section/featured-cities-section';
import { FeaturedDestinationsSection } from './_components/featured-destinations-section/featured-destinations-section';
import { Hero } from './_components/hero';

export default async function Home() {
  return (
    <main className="min-h-screen w-full">
      <section>
        <Hero />
      </section>
      <section className="bg-gray-50 pb-16 pt-40 dark:bg-transparent lg:pt-52">
        <FeaturedCitiesSection />
        <FeaturedDestinationsSection />
      </section>
    </main>
  );
}
