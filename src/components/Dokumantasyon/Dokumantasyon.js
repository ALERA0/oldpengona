import React from "react";
import slides from "./mock.json";
import DokumantasyonSlider from "./DokumantasyonSlider";

const Dokumantasyon = () => {
  return (
    <div className="w-full px-20 pt-20 flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold text-center text-[#001653] mb-4 ">Ürün Dökümantasyonları</h2>
      <DokumantasyonSlider slides={slides} />
    </div>
  );
};

export default Dokumantasyon;
