import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, EffectCube } from "swiper";
import {AiOutlineArrowRight} from 'react-icons/ai'


// Import Swiper styles
import "swiper/swiper-bundle.min.css";
import { motion } from "framer-motion";

const Slider = ({ slides }) => {
  return (
    <div className="w-full flex justify-center items-center lg:px-20 md:px-10 px-5 py-16">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, EffectCube]}
        spaceBetween={70}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        breakpoints={{
          0:{
            slidesPerView:1,
            spaceBetween:20
          },
          768:{
            slidesPerView:2,
            spaceBetween:40
          },
          1400:{
            slidesPerView:3,
            spaceBetween:70
          }
        }}
        
        
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.image}>
            <div className="w-full h-[520px] flex  justify-center items-start lg:mb-0 md:mb-12 ">
              <motion.a className="md:w-5/6 w-[300px]  h-full relative flex flex-col justify-start items-center hover:text-blue-500 " href="/" whileHover={{scale:1.1}}>
                <Image
                  src={slide.image}
                  alt={slide.title}
                  width={200}
                  height={200}
                  className="flex justify-center items-center w-full h-2/3 object-center"
                />
                <div className="w-full flex flex-col bg-[#160039] text-light py-6 md:px-8 px-3">
                  <div className="flex  justify-center items-center ">
                    <h2 className="text-2xl font-bold ">
                      Tercih Robotu Mobil Uygulaması
                    </h2>
                    <AiOutlineArrowRight size={45} className=""/>
                  </div>
                </div>
              </motion.a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
