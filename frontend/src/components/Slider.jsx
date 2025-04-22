import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Card from "./Card";

export default ({ item }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      // pagination={{clickable:true}}
      spaceBetween={50}
      slidesPerView={5}
      breakpoints={{
        320: {
          // For small screens
          slidesPerView: 1, // Show 1 card per slide
        },
        768: {
          // For medium screens (tablets)
          slidesPerView: 2, // Show 2 cards per slide
        },
        1024: {
          slidesPerView: 3, // Show 3 cards per slide
        },
        1224: {
          // For larger screens (desktops)
          slidesPerView: 4, // Show 3 cards per slide
        },
        1640: {
          // For very large screens
          slidesPerView: 5, // Show 4 cards per slide
        },
      }}
    >
      {item.map((slider, i) => (
        <SwiperSlide key={i}>
          {
            <div key={i} className="flex items-center justify-center flex-col">
              <Card item={slider} />
            </div>
          }
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
