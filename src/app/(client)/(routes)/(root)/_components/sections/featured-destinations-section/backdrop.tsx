'use client';

import { AnimatePresence, m } from 'framer-motion';

import { useSelectDestination } from './use-select-destination';

export const Backdrop = () => {
  const { selectedDestination, setSelectedDestination } = useSelectDestination();

  return (
    <AnimatePresence>
      {selectedDestination && (
        <m.div
          className="z-3 fixed left-0 top-0 h-full w-full bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedDestination(null)}
        />
      )}
    </AnimatePresence>
  );
};
