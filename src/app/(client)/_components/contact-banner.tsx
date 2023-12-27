import { Button } from '@/components/ui/button';

export const ContactBanner = () => {
  return (
    <section className="section">
      <div className="flex flex-wrap justify-between gap-6 rounded-xl bg-primary p-4 md:p-12">
        <div className="text-white">
          <h2 className="mb-3 text-2xl font-bold md:text-4xl">Get our pro offers</h2>
          <p>
            Create visual identify for your company
            <br /> and an overall brand
          </p>
        </div>
        <div className="flex w-full justify-between self-end rounded-xl bg-white p-2 dark:bg-background md:gap-10 lg:w-auto lg:justify-start">
          <input
            type="email"
            className="w-full bg-transparent px-3 text-sm outline-none lg:text-base"
            placeholder="Type your email here"
          />
          <Button className="md:px-5 md:py-2.5">Subscribe</Button>
        </div>
      </div>
    </section>
  );
};
