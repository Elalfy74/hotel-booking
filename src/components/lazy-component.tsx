import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export const LazyComponent = ({ children }: { children: React.ReactNode }) => {
  const { ref, inView } = useInView();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (inView) {
      setShouldRender(true);
    }
  }, [inView]);

  return <div ref={ref}>{shouldRender && children}</div>;
};
