import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const OurServices = ({ text, icon }) => {
  return (
    <motion.div
      className="flex cursor-pointer hover:shadow-xl hover:shadow-[#2EE0FC] flex-col py-6 px-8 border border-[#2EE0FC] duration-300 gap-2"
      whileHover={{ scale: 1.03 }}
    >
      <Image src={icon} alt="web" width={65} height={65} className="mx-auto" />
      <h2 className="w-full flex text-center justify-center items-center text-light">{text}</h2>
    </motion.div>
  );
};

export default OurServices;
