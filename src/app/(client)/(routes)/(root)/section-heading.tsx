import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  desc: string | React.ReactNode;
  center?: boolean;
  container?: boolean;
}

export const SectionHeading = ({ title, desc, center, container }: SectionHeadingProps) => {
  return (
    <div className={cn('mb-10', { 'text-center': center, 'container sm:block': container })}>
      <h2 className="mb-5 text-3xl font-semibold md:text-4xl">{title}</h2>
      <p className="text-sm text-gray-600 dark:text-slate-500">{desc}</p>
    </div>
  );
};
