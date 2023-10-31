import Link from "next/link";
import React from "react";

const Haritalar = () => {
  return (
    <div className="w-full flex md:px-24 px-3 flex-col py-12">
    <h2 className="w-full text-center text-5xl mb-8 font-bold ">İLETİŞİM</h2>
      <Link  href="https://www.google.com/maps/place/Pengona+Yaz%C4%B1l%C4%B1m/@37.9835149,32.5183466,17z/data=!4m14!1m7!3m6!1s0x14d08f23a4285db5:0x55c83d9918c956d8!2zUGVuZ29uYSBZYXrEsWzEsW0!8m2!3d37.9833585!4d32.5205138!16s%2Fg%2F11q3y1x100!3m5!1s0x14d08f23a4285db5:0x55c83d9918c956d8!8m2!3d37.9833585!4d32.5205138!16s%2Fg%2F11q3y1x100?entry=ttu"
      target="_blank" className="flex w-full">
        <div
          className="w-full flex md:px-20 px-3 h-[600px] bg-center border-2 rounded-xl shadow-2xl  xl:items-center items-end "
          style={{ backgroundImage: "url(images/map.png)" }}
        >
          <div className="flex w-[550px] justify-center items-center flex-col bg-slate-200 border rounded-lg px-6 py-7 mt">
            <h2 className="w-full text-2xl flex items-start font-bold mb-4">
              Pengona Merkez
            </h2>
            <Link
              href="https://www.google.com/maps/place/Pengona+Yaz%C4%B1l%C4%B1m/@37.9835149,32.5183466,17z/data=!4m14!1m7!3m6!1s0x14d08f23a4285db5:0x55c83d9918c956d8!2zUGVuZ29uYSBZYXrEsWzEsW0!8m2!3d37.9833585!4d32.5205138!16s%2Fg%2F11q3y1x100!3m5!1s0x14d08f23a4285db5:0x55c83d9918c956d8!8m2!3d37.9833585!4d32.5205138!16s%2Fg%2F11q3y1x100?entry=ttu"
              target="_blank"
              className="underline text-lg"
            >
              Kosova Mahallesi Güneş Sokak No: 1G - 42300 Selçuklu/Konya
            </Link>
            <p className="w-full  flex items-start  mt-4"><span className="font-bold">Tel:&nbsp;</span> +90 512 345 67 89</p>
            <p className="w-full  flex items-start  mt-2"><span className="font-bold">Email:&nbsp;</span> abcd@gmail.com</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Haritalar;
