import { cva, VariantProps } from 'class-variance-authority';

const spinnerVariants = cva('animate-spin', {
  variants: {
    variant: {
      oval: 'fill-primary',
      ios: 'stroke-primary',
    },
    size: {
      default: 'h-6 w-6',
      sm: 'w-4 h-4',
      md: 'w-8 h-8',
      lg: 'h-10 w-10',
    },
  },
  defaultVariants: {
    variant: 'oval',
    size: 'default',
  },
});

export interface SpinnerProps
  extends React.SVGProps<SVGSVGElement>,
    VariantProps<typeof spinnerVariants> {
  variant?: 'oval' | 'ios';
}

export const Spinner = ({ className, variant = 'oval', size, ...props }: SpinnerProps) => {
  return (
    <div aria-label="Loading..." role="status">
      {variant === 'oval' && (
        <svg viewBox="3 3 18 18" className={spinnerVariants({ size, variant, className })}>
          <path
            className="opacity-20"
            d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
          ></path>
          <path d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"></path>
        </svg>
      )}

      {variant === 'ios' && (
        <svg
          className={spinnerVariants({ size, variant, className })}
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 3v3m6.366-.366-2.12 2.12M21 12h-3m.366 6.366-2.12-2.12M12 21v-3m-6.366.366 2.12-2.12M3 12h3m-.366-6.366 2.12 2.12"></path>
        </svg>
      )}
    </div>
  );
};
