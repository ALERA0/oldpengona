import React from "react";
import Slider from "./Slider";
import slides from "./mock.json";

const OurProjects = () => {
  return (
    <div className="w-full 2xl:px-20 2xl:pt-20 pt-6 flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold text-center text-[#001653] mb-4 ">Ürünlerimiz</h2>
      <Slider slides={slides} />
    </div>
  );
};

export default OurProjects;
