import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { Header } from '@/components/layouts/header';
import { FramerMotionProvider } from '@/components/providers/framer-motion-provider';

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <FramerMotionProvider>{children}</FramerMotionProvider>
    </>
  );
};
export default ClientLayout;
