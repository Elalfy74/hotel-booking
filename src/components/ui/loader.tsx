import { cn } from '@/lib/utils';

export const Loader = ({ className }: { className?: string }) => {
  return (
    <div className="flex h-full items-center justify-center space-x-2 ">
      <span className="sr-only">Loading...</span>
      <div
        className={cn(
          'h-4 w-4 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]',
          className,
        )}
      />
      <div
        className={cn(
          'h-4 w-4 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]',
          className,
        )}
      />
      <div className={cn('h-4 w-4 animate-bounce rounded-full bg-gray-400', className)} />
    </div>
  );
};
