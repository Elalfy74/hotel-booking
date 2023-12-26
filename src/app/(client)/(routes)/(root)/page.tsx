import {
  FeaturedCitiesSection,
  FeaturedDestinationsSection,
  HeroSection,
  TopToursSection,
} from './_components';

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
      </div>
    </main>
  );
}
