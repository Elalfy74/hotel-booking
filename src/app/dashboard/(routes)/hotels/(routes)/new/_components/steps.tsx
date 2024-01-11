import { cn } from '@/lib/utils';

import { stepsData } from './steps-data';
export const Steps = ({ currentStep }: { currentStep: number }) => {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
        {stepsData.map((step, index) => {
          const isActive = step.id <= currentStep;

          return (
            <li key={step.name} className="md:flex-1">
              <div
                className={cn(
                  'flex w-full flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4',
                  isActive ? 'border-primary' : 'md:border-gray-200',
                )}
                aria-current={currentStep === index ? 'step' : undefined}
              >
                <span
                  className={cn('text-sm font-medium', isActive ? 'text-primary' : 'text-gray-500')}
                >
                  {step.title}
                </span>
                <span className="text-sm font-medium">{step.name}</span>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
