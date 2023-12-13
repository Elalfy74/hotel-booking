import { Input, InputProps } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export const AuthInput = (props: InputProps) => {
  return (
    <Input
      {...props}
      className={cn(
        'bg-slate-200 focus-visible:bg-white focus-visible:bg-none dark:bg-background',
        props.className,
      )}
    />
  );
};
