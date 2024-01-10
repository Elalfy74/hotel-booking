import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { stepsData } from './steps-data';

interface NavigationProps {
  currentStep: number;
  next: () => void;
  prev: () => void;
}

export const Navigation = ({ currentStep, next, prev }: NavigationProps) => {
  return (
    <div className="mt-8 pt-5">
      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          className="w-40"
          onClick={prev}
          disabled={currentStep === 0}
        >
          <ArrowLeftIcon />
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-40"
          onClick={next}
          disabled={currentStep === stepsData.length - 1}
        >
          <ArrowRightIcon />
        </Button>
      </div>
    </div>
  );
};
