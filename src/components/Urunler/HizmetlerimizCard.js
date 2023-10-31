import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const HizmetlerimizCard = ({ icon, text, title }) => {
  return (
    <motion.div
      className="flex cursor-pointer hover:shadow-xl hover:shadow-[#2EE0FC]  lg:py-6 md:py-4 py-2 px-8 border border-[#2EE0FC] duration-300  bg-[#000E36] gap-4  md:h-[220px] h-[320px] "
      whileHover={{ scale: 1.03 }}
    >
      <Image src={icon} alt="icon" width={65} height={65} className="" />
      <div className="w-full flex flex-col  items-start gap-2">
        <h2 className="w-full text-center lg:text-2xl md:text-xl text-lg font-semibold text-[#2EE0FC] ">
          {title}
        </h2>
        <p className="w-full flex justify-center items-center text-center 2xl:text-xl xl:text-lg lg:text-base text-smfont-semibold text-light ">
          {text}
        </p>
      </div>
    </motion.div>
  );
};

export default HizmetlerimizCard;
