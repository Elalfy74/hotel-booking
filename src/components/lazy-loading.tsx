import { DynamicOptionsLoadingProps } from 'next/dynamic';

import { Loader } from './ui/loader';

export const LazyLoading = (_: DynamicOptionsLoadingProps) => {
  return <Loader />;
};
