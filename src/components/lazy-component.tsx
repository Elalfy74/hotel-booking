import { useInView } from 'react-intersection-observer';

export const LazyComponent = ({ children }: { children: React.ReactNode }) => {
  const { ref, inView } = useInView();

  return <div ref={ref}>{inView && children}</div>;
};
