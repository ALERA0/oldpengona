import { motion } from "framer-motion";
import React from "react";


const Bayiliklerimiz = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center lg:px-24 md:px-12 px-6 py-12">
      <h2 className="w-full text-center  text-3xl mb-8 font-bold text-[#001653]">
        Bayiliklerimiz
      </h2>
      <div className="w-full grid grid-cols-2 md:gap-4 gap-3">
        <motion.div
          className="flex cursor-pointer hover:shadow-xl hover:shadow-[#2EE0FC]  py-6 px-8 border border-[#2EE0FC] duration-300  bg-[#000E36] gap-4 h-[200px] "
          whileHover={{ scale: 1.03 }}
        ></motion.div>
        <motion.div
          className="flex cursor-pointer hover:shadow-xl hover:shadow-[#2EE0FC]  py-6 px-8 border border-[#2EE0FC] duration-300  bg-[#000E36] gap-4 h-[200px] "
          whileHover={{ scale: 1.03 }}
        ></motion.div>
      </div>
    </div>
  );
};

export default Bayiliklerimiz;
