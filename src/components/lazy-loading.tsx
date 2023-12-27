import { DynamicOptionsLoadingProps } from 'next/dynamic';

import { Loader } from './ui/loader';

export const LazyLoading = (_: DynamicOptionsLoadingProps) => {
  return (
    <div className="h-[200px]">
      <Loader />
    </div>
  );
};
