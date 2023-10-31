import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, EffectCube } from "swiper";
import { AiOutlineArrowRight } from "react-icons/ai";

// Import Swiper styles
import "swiper/swiper-bundle.min.css";
import { motion } from "framer-motion";
import Link from "next/link";

const ReferansSlider = ({ slides }) => {

  return (
    <div className="w-full flex justify-center items-center md:px-20 px-0 py-4 duration-300">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, EffectCube]}
        spaceBetween={70}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        autoplay={{ delay: 2000 }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1400: {
            slidesPerView: 3,
            spaceBetween: 40,
          }
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.image}>
            <Link
            target="blank"
              className="w-full h-[220px] flex  justify-center items-start "
              href={slide.href}
            >
              <motion.div
                className="md:w-4/6 w-[200px] duration-300  h-full relative flex flex-col justify-center items-center hover:text-blue-500 "
                whileHover={{ scale: 1.1 }}
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  width={100}
                  height={100}
                  className="flex justify-center items-center w-2/3  object-center"
                />
                
              </motion.div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReferansSlider;
