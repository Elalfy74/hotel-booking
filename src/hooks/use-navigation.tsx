import { useRef, useState } from 'react';
import type SwiperCore from 'swiper';

interface NavigationStatus {
  isBeginning: boolean;
  isEnd: boolean;
}

export const useNavigation = () => {
  const swiperRef = useRef<SwiperCore | null>(null);
  const [status, setStatus] = useState<NavigationStatus>({
    isBeginning: true,
    isEnd: false,
  });

  const setSwiperRef = (swiper: SwiperCore) => {
    swiperRef.current = swiper;
  };

  const handleSwiperChange = (dir: 'prev' | 'next') => {
    const swiper = swiperRef.current;
    if (swiper) {
      dir === 'prev' ? swiper.slidePrev() : swiper.slideNext();
    }
  };

  const handleCurrentStatus = (newStatus: NavigationStatus) => {
    setStatus(newStatus);
  };

  return {
    setSwiperRef,
    handleSwiperChange,
    status,
    handleCurrentStatus,
  };
};
