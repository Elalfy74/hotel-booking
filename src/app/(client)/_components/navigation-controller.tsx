import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

type NavigationControllerProps = {
  handleSwiperChange: (dir: 'prev' | 'next') => void;
  status: {
    isBeginning: boolean;
    isEnd: boolean;
  };
};

export const NavigationController = ({ handleSwiperChange, status }: NavigationControllerProps) => {
  const btnStyle =
    'rounded-full bg-gray-200 p-2 duration-300 hover:bg-gray-300 dark:bg-secondary  disabled:bg-gray-100 disabled:cursor-not-allowed';

  return (
    <div className="flex gap-2">
      <Button
        variant="secondary"
        size="icon"
        disabled={status.isBeginning}
        className={btnStyle}
        onClick={() => handleSwiperChange('prev')}
      >
        <ChevronLeftIcon width={15} className="text-gray-600 dark:text-white" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        disabled={status.isEnd}
        className={btnStyle}
        onClick={() => handleSwiperChange('next')}
      >
        <ChevronRightIcon width={15} className="text-gray-600 dark:text-white" />
      </Button>
    </div>
  );
};
