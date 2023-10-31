import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, EffectCube } from "swiper";
import { AiOutlineArrowRight } from "react-icons/ai";

// Import Swiper styles
import "swiper/swiper-bundle.min.css";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Link from "next/link";

const Slider = ({ slides }) => {
  const router = useRouter();

  return (
    <div className="w-full flex justify-center items-center md:px-20 px-0 py-16 duration-300">
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
            spaceBetween: 70,
          },
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.image}>
            <Link
              className="w-full h-[520px] flex  justify-center items-start "
              href={slide.href}
            >
              <motion.div
                className="md:w-4/6 w-[300px] duration-300  h-full relative flex flex-col justify-start items-center hover:text-blue-500 "
                whileHover={{ scale: 1.1 }}
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  width={200}
                  height={200}
                  className="flex justify-center items-center w-full h-2/3 object-center"
                />
                <div className="w-full flex flex-col bg-[#160039] text-light py-4 md:px-8 px-2">
                  <div className="flex  justify-center items-center ">
                    <h2 className="text-3xl font-bold line-clamp-2  ">{slide.text}</h2>
                    <AiOutlineArrowRight size={45} className="" />
                  </div>
                </div>
              </motion.div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
