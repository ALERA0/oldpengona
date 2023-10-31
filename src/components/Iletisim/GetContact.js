import React from "react";

const GetContact = () => {
  return (
    <div className="w-full flex md:flex-row flex-col md:px-24 px-2 mt-6">
      <div className=" w-full flex flex-col items-center justify-center md:my-0 my-12 ">
        <h2 className="md:text-3xl text-2xl">// Kazanmanın Sırrı</h2>
        <h2 className="w-full md:text-5xl text-3xl  text-center  ">Bizimle İletişimde Kalın</h2>
      </div>
      <div className=" w-full md:px-20 px-2">
        <div className="flex flex-col items-center justify-center bg-[#000E36] md:px-12 px-6 py-12 rounded-xl  gap-8">
          <div className="w-full flex md:flex-row flex-col items-center justify-between md:gap-4 lg:gap-8 gap-2 ">
            <input
              className="w-full md:w-auto px-4 py-2 rounded-lg text-lg"
              placeholder="Adınız"
            />
            <input
              className="w-full md:w-auto px-4 py-2 rounded-lg text-lg"
              placeholder="Soyadınız"
            />
          </div>
          <div className="w-full flex items-center justify-between ">
            <input
              className=" w-full px-4 py-2 rounded-lg text-lg "
              placeholder="E-Mail"
            />
          </div>
          <div className="w-full flex items-center justify-around ">
            <input
              className="w-full px-4 py-2 rounded-lg text-lg"
              placeholder="Konu"
            />
          </div>
          <div className="w-full flex items-center justify-around ">
            <textarea
              className="w-full px-4 py-2 rounded-lg text-lg"
              placeholder="Mesajınız"
              rows={5}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetContact;
