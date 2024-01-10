import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

import { stepsData } from './steps-data';

interface NavigationProps {
  isPending: boolean;
  currentStep: number;
  next: () => void;
  prev: () => void;
}

export const Navigation = ({ isPending, currentStep, next, prev }: NavigationProps) => {
  return (
    <div className="mt-8 pt-5">
      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          className="w-40"
          onClick={prev}
          disabled={currentStep === 0 || isPending}
        >
          <ArrowLeftIcon />
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-40"
          onClick={next}
          disabled={isPending}
        >
          {isPending ? (
            <Spinner />
          ) : currentStep === stepsData.length - 1 ? (
            'Submit'
          ) : (
            <ArrowRightIcon />
          )}
        </Button>
      </div>
    </div>
  );
};
