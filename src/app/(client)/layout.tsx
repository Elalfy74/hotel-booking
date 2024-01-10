import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { Footer } from '@/components/layouts/footer';
import { Header } from '@/components/layouts/header';

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
export default ClientLayout;
