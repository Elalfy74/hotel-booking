import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';

import { NavigationController } from '@/app/(client)/_components/navigation-controller';
import { Button } from '@/components/ui/button';

import { SectionHeading, type SectionHeadingProps } from './section-heading';

interface SectionHeadingWithControllerProps extends SectionHeadingProps {
  handleSwiperChange: (direction: 'next' | 'prev') => void;
  status: {
    isBeginning: boolean;
    isEnd: boolean;
  };
}

export const SectionHeadingWithController = (props: SectionHeadingWithControllerProps) => {
  const { handleSwiperChange, status, ...sectionHeadingProps } = props;

  return (
    <div className="container flex items-center justify-between sm:flex">
      <SectionHeading {...sectionHeadingProps} />

      <div className="flex flex-col">
        <Button asChild variant="link" className="p-0">
          <Link href={'/countries'}>
            See All <ChevronRightIcon width={15} />
          </Link>
        </Button>

        <div className="hidden md:flex">
          <NavigationController handleSwiperChange={handleSwiperChange} status={status} />
        </div>
      </div>
    </div>
  );
};
