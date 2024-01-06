'use client';

import { SearchForm } from '@/components/search-form/search-form';
import { useMobileDetector } from '@/hooks/use-mobile-detector';

import { MiniFilterForm } from './filter/mini-filter-form';

export const HotelsSearchForm = () => {
  const isMobile = useMobileDetector();

  return isMobile ? <MiniFilterForm /> : <SearchForm />;
};
