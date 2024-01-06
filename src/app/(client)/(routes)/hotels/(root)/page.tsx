import { ContactBanner } from '@/app/(client)/_components/contact-banner';
import { Breadcrumbs } from '@/components/breadcrumbs';

import { Filter } from './_components/filter/filter';
import { HotelList } from './_components/hotels-list';
import { HotelsSearchForm } from './_components/hotels-search-form';

const breadcrumbsItems = [{ title: 'Hotels', url: '/hotels' }];

export default function HotelsPage() {
  return (
    <div className="mt-10 px-4 py-10 lg:px-20 xl:px-48">
      <Breadcrumbs items={breadcrumbsItems} />
      <div className="my-10">
        <HotelsSearchForm />
      </div>
      <div className="flex">
        <div className="hidden lg:mr-20 lg:block lg:w-1/4">
          <Filter />
        </div>
        <div className="w-full lg:w-3/4">
          <HotelList />
        </div>
      </div>
      <ContactBanner />
    </div>
  );
}
