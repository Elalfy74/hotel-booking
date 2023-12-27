'use client';

import { domMax, LazyMotion } from 'framer-motion';

export const FramerMotionProvider = ({ children }: { children: React.ReactNode }) => {
  return <LazyMotion features={domMax}>{children}</LazyMotion>;
};
