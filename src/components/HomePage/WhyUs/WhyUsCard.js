import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";


const WhyUsCard = ({icon,text,header}) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-4 cursor-pointer hover:shadow-xl h-[350px] pt-8 lg:mt-5 xl:mt-0 text-[#000E36] "
      whileHover={{ scale: 1.1 }}
    >
      <div className="flex w-full justify-center items-center h-1/2">
        <div className="w-full flex flex-col justify-center items-center h-full my-auto gap-2 ">
          <Image
            src={icon}
            alt=""
            className="w-1/6 flex justify-center items-center mx-auto"
          />
          <h2 className="text-center text-3xl font-bold ">{header}</h2>
        </div>
      </div>
      <div className="flex flex-col w-full justify-start items-center h-1/2">
        <p className="text-center text-lg px-4 font-semibold">
         {text}
        </p>
      </div>
    </motion.div>
  );
};

export default WhyUsCard;
