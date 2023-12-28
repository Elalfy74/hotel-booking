import Image from 'next/image';
import Link from 'next/link';

import { Card } from '@/components/ui/card';

interface EntityCardProps {
  title: string;
  subTitle?: string;
  badge?: string;
  image: string;
  url: string;
}

export const EntityCard = (props: EntityCardProps) => {
  const { title, subTitle, badge, image, url } = props;

  return (
    <Link href={url} className="w-full">
      <Card className="overlay group relative h-full w-full overflow-hidden text-white before:z-[2]">
        <Image
          width={400}
          height={400}
          src={image}
          alt="entity img"
          className="relative aspect-square h-auto w-full object-cover duration-500 group-hover:scale-110"
        />
        {badge && (
          <p className="absolute left-4 top-4 rounded-full bg-black bg-opacity-30 px-3 py-2 font-semibold capitalize md:left-6 md:top-6 md:px-4 md:py-3">
            {badge}
          </p>
        )}
        <div className="absolute bottom-6 left-6 z-[3]">
          <h3 className="capitalize">{title}</h3>
          {subTitle && <p>{subTitle}</p>}
        </div>
      </Card>
    </Link>
  );
};
