import React from "react";
import slides from "./mock.json";
import ReferansSlider from "./ReferansSlider";

const Referanslar = () => {
  return (
    <div className="w-full px-20 pt-4 flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold text-center text-[#001653] mb-2 ">Referanslar</h2>
      <ReferansSlider slides={slides} />
    </div>
  );
};

export default Referanslar;
