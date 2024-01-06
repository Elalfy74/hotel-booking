import { StarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

interface StarsProps {
  className?: string;
  stars: number;
  shouldFill?: boolean;
}

export const Stars = ({ className, stars, shouldFill = false }: StarsProps) => {
  const fixedStars = +stars.toFixed();
  const restStars = 5 - fixedStars;

  return (
    <div className="flex gap-1">
      {new Array(fixedStars).fill('').map((_, i) => (
        <StarIcon
          className={cn('h-3 w-3 fill-current text-orange-400 sm:h-5 sm:w-5', className)}
          key={i}
        />
      ))}
      {shouldFill &&
        restStars > 0 &&
        new Array(restStars)
          .fill('')
          .map((_, i) => (
            <StarIcon
              className={cn('h-3 w-3 fill-current text-gray-300 sm:h-5 sm:w-5', className)}
              key={i}
            />
          ))}
    </div>
  );
};
