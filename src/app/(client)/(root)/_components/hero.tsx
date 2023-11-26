import Image from 'next/image';

import { SearchForm } from '@/components/search-form/search-form';

export const Hero = () => {
  return (
    <div className="overlay">
      <Image
        src="/hero.jpg"
        width={1920}
        height={700}
        alt="hero"
        className="h-[30rem] object-cover lg:h-[40rem]"
        priority
      />

      <div className="container absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full lg:-translate-y-1/2">
        <h1 className="text-4xl font-bold leading-[3.5rem] tracking-wider text-slate-100 sm:text-5xl 2xl:text-6xl 2xl:leading-[5rem]">
          Book With Us <br /> And Enjoy your <br />
          Journey !
        </h1>
      </div>

      <div className="container absolute left-1/2 -translate-x-1/2 -translate-y-2/3 lg:-translate-y-1/2">
        <SearchForm />
      </div>
    </div>
  );
};
