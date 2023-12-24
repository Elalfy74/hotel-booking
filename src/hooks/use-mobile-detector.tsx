import { useEffect, useState } from 'react';

export const useMobileDetector = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 767px)').matches);
  }, []);

  return isMobile;
};
