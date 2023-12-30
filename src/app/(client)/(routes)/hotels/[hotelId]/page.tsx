import { notFound } from 'next/navigation';

import { ContactBanner } from '@/app/(client)/_components/contact-banner';
import { BreadcrumbItemType, Breadcrumbs } from '@/components/breadcrumbs';
import { Stars } from '@/components/stars';
import { Separator } from '@/components/ui/separator';
import prisma from '@/lib/prisma';

import { HotelImagesGallery } from './_components/hotel-images-gallery';
import { HotelTabs } from './_components/hotel-tabs';
import { HotelTags } from './_components/hotel-tags';
import { RoomsList } from './_components/rooms-list';

export async function generateStaticParams() {
  const hotelsIds = await prisma.hotel.findMany({
    where: {
      isFeatured: true,
    },
    select: {
      id: true,
    },
  });

  return hotelsIds;
}

const getHotel = (id: string) => {
  return prisma.hotel.findUnique({
    where: {
      id,
    },
    include: {
      city: {
        select: {
          name: true,
          country: {
            select: {
              name: true,
            },
          },
        },
      },
      features: {
        select: {
          feature: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      images: true,
      rooms: true,
    },
  });
};
export type IHotel = AwaitedReturn<typeof getHotel>;
export type IHotelFeature = { id: string; name: string };

interface SingleHotelPageProps {
  params: {
    hotelId: string;
  };
}
export default async function SingleHotelPage({ params: { hotelId } }: SingleHotelPageProps) {
  const hotel = await getHotel(hotelId);

  if (!hotel) {
    return notFound();
  }

  const breadcrumbItems: BreadcrumbItemType[] = [
    {
      title: 'hotels',
      url: '/hotels',
    },
    {
      title: hotel.name || '',
      url: `/hotels/${hotel.id}`,
    },
  ];

  const hotelFeatures: IHotelFeature[] = hotel.features.map((f) => ({
    id: f.feature.id,
    name: f.feature.name,
  }));

  return (
    <div className="bg-gray-50 dark:bg-transparent">
      <div className="px-4 py-10 md:px-20 lg:px-48">
        <Breadcrumbs items={breadcrumbItems} />
        <div>
          <h1 className="my-4 text-4xl font-semibold capitalize">{hotel.name}</h1>
          <div className="mb-4 flex items-center gap-10">
            <Stars stars={hotel.stars} shouldFill />
            <p className="capitalize">
              {hotel.city.name}, {hotel.city.country.name}
            </p>
          </div>
          <HotelImagesGallery images={hotel.images} />
          <HotelTags tags={hotelFeatures} />
        </div>

        <div className="mb-10 flex flex-col justify-between gap-10 lg:flex-row xl:gap-20 2xl:gap-28">
          <div className="mt-5 w-full lg:w-2/3">
            <HotelTabs description={hotel.description} features={hotelFeatures} />
          </div>
          <div className="w-full lg:w-1/3">{/* <BookingSummary /> */}</div>
        </div>
        <Separator />

        <div className="container mt-20 flex flex-col gap-20 xl:w-[70%]">
          <RoomsList rooms={hotel.rooms} />
          {/* <ReviewForm />
          <ReviewsList /> */}
        </div>
      </div>

      {/* <div className="container">
        <TrendingHotels /> 
      </div> */}
      <ContactBanner />
    </div>
  );
}
