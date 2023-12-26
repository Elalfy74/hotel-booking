// import { FreeMode } from 'swiper';
// import { Swiper, SwiperSlide } from 'swiper/react';

// import { useMobileDetector, useNavigation } from '@/hooks';
// import { IHotelWCity } from '@/types/hotels';

// import NavigationController from '../../shared/navigation-controller';
// import Heading from '../section-heading';
// import Hotel from './hotel';

// const options = {
//   640: {
//     slidesPerView: 2,
//   },
//   768: {
//     slidesPerView: 3,
//     spaceBetween: 30,
//   },
//   1536: {
//     slidesPerView: 4,
//     spaceBetween: 40,
//   },
// };

// export const ExploreTheWorldSection = ({ hotels }: { hotels: IHotelWCity[] }) => {
//   const { setSwiperRef, handleSwiperChange, handleCurrentStatus, status } = useNavigation();
//   const isMobile = useMobileDetector();

//   return (
//     <section className="section-swiper">
//       <div className="flex items-center justify-between px-4 sm:px-0">
//         <Heading title="Explore The World" desc="1000 beautiful places to go" />
//         {!isMobile && (
//           <NavigationController handleSwiperChange={handleSwiperChange} status={status} />
//         )}
//       </div>
//       <Swiper
//         className="swiper-padding"
//         slidesPerView={1.5}
//         freeMode={true}
//         modules={[FreeMode]}
//         spaceBetween={20}
//         breakpoints={options}
//         onBeforeInit={(swiper) => {
//           setSwiperRef(swiper);
//         }}
//         onSlideChange={({ isBeginning, isEnd }) => handleCurrentStatus({ isBeginning, isEnd })}
//       >
//         {hotels.map((hotel, i) => (
//           <SwiperSlide key={hotel._id}>
//             <Hotel hotel={hotel} />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </section>
//   );
// };
