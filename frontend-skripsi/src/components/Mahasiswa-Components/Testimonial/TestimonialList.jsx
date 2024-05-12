import React from "react";
import { testimonial } from "../../../assets/data/testimonial";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import TestimonialCard from "./TestimonialCard";

const TestimonialList = () => {
  return (
    <div className="mt-[30px] lg:mt-[55px]">
        <Swiper
        modules={[Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
      {testimonial.map((item, index) => (
        <SwiperSlide key={index}>
        <TestimonialCard key={index} item={item} index={index} />
        </SwiperSlide>
      ))}
      </Swiper>
    </div>
  );
};

export default TestimonialList;
