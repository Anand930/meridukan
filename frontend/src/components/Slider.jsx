import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation } from 'swiper/modules';


import Card from './Card';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';


export default ({ item }) => {
  const swiper = useSwiper()
  return (
    <Swiper
    modules={[Navigation]}
    navigation
      spaceBetween={50}
      slidesPerView={5}
      breakpoints={{
        320: {            // For small screens
          slidesPerView: 2 ,   // Show 1 card per slide
        },
        768: {            // For medium screens (tablets)
          slidesPerView: 3,   // Show 2 cards per slide
        },
        1024: {           // For larger screens (desktops)
          slidesPerView: 4,   // Show 3 cards per slide
        },
        1440: {           // For very large screens
          slidesPerView: 5,   // Show 4 cards per slide
        }
      }}
      onSlideChange={() => {}}
      onSwiper={(swiper) => {}}
    >
      {item.map((slider, i) => (
        <SwiperSlide key={i} >{
          <div key={i}>
            <Card item={slider}/>
          </div>
        }</SwiperSlide>
      ))}
      <button onClickCapture={() => swiper.slideNext()}></button>
    </Swiper>
  );
};