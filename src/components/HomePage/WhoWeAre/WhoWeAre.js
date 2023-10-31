import Link from "next/link";
import React from "react";
import { BsArrowRightShort } from "react-icons/bs";
import brain from "../../../../public/images/brain.jpg";
import Image from "next/image";
import { motion } from "framer-motion";
import web from "../../../../public/icons/webIcons/web.svg";
import ios from "../../../../public/icons/webIcons/ios.svg";
import hosting from "../../../../public/icons/webIcons/hosting.svg";
import android from "../../../../public/icons/webIcons/android.svg";
import portal from "../../../../public/icons/webIcons/portal.svg";
import OurServices from "./OurServices";

const WhoWeAre = () => {
  return (
    <div className="w-full m-auto   relative group">
      <div className=" mt-14 sm:mt-28 w-full flex lg:flex-row flex-col xl:px-20 lg:px-8 px-5 sm:pt-14 pt-10 lg:pt-18 pb-4  bg-[#000E36] 2xl:h-[1100px] ">
        <div className="lg:w-1/2 w-full flex flex-col justify-start items-center lg:items-start  ">
          <div className="flex justify-start items-start xl:pl-16 ">
            <h2 className="lg:text-6xl md:text-5xl text-4xl font-bold text-start text-light mb-4">
              Pengona Ailesi
            </h2>
          </div>
          <div className="lg:flex hidden justify-center items-start xl:pl-16 w-full xl:mt-12 pr-8">
            <Image
              src={brain}
              alt="brain"
              className="rounded-xl 2xl:w-4/5 xl:3/4 lg:4/5"
            />
          </div>
        </div>
        <div className="lg:w-1/2 w-full  flex flex-col justify-start items-start lg:file:pr-14">
          <div className="text-xl lg:text-2xl  text-start text-light pt-3 tracking-wide">
            Pengona Yazılım ailesi olarak, profesyonel ve yenilikçi çözümler
            sunarak müşteri memnuniyetini ön planda tutuyoruz.{" "}
            <span className="text-blue-400">
              Hosting, Domain, Web tasarım yazılımı, Android/IOS mobil uygulama
              tasarım yazılımı ve portal geliştirmeleri
            </span>{" "}
            gibi geniş bir hizmet yelpazesiyle müşterilerimize kapsamlı çözümler
            sunuyoruz.{" "}
            <div className="w-full flex justify-end items-end">
              <motion.div
                whileHover={{ scale: 0.9 }}
                whileTap={{ scale: 0.8 }}
                className="flex justify-end items-end"
              >
                <Link
                  className="text-blue-400 text-2xl flex xl:mt-3 mt-1 underline justify-center items-center pr-4  hover:text-light"
                  href="/kurumsal"
                >
                  <BsArrowRightShort size={45} />
                  Daha fazla
                </Link>
              </motion.div>
            </div>
          </div>
          <div className="flex flex-col w-full sm:mt-8 mt-6">
            <p className="lg:text-2xl text-xl text-purple-500">
              Başarımızın sırrı..
            </p>
            <h2 className="lg:text-4xl text-2xl text-light mt-4 sm:mb-12 mb-6 lg:mb-0">
              Pengona Yazılım,tutkuyu yansıtır
            </h2>
            <div className="lg:grid grid-cols-3 items-center mx-auto mt-3 hidden 2xl:hidden">
              <OurServices text="WEB" icon={web} />
              <OurServices text="ANDROID" icon={android} />
              <OurServices text="IOS" icon={ios} />
              <div className="flex col-span-3 justify-center">
                <OurServices text="HOSTING" icon={hosting} />
                <OurServices text="PORTAL" icon={portal} />
              </div>
            </div>
            <div className="lg:grid grid-cols-3 items-center mx-auto  hidden"></div>
          </div>
        </div>
        <div className="lg:hidden flex flex-col w-full gap-4">
          <OurServices text="WEB" icon={web} />
          <OurServices text="ANDROID" icon={android} />
          <OurServices text="IOS" icon={ios} />
          <OurServices text="HOSTING/DOMAIN" icon={hosting} />
          <OurServices text="PORTAL" icon={portal} />
        </div>
      </div>

      <div className="hidden 2xl:flex">
        <div className=" group lg:absolute  top-[58%] right-[8%] lg:w-2/3 w-full  text-2xl  lg:border-2  bg-[#000E36] border-0 lg:border-[#2EE0FC] px-48 text-white  py-8">
          <div className="lg:flex hidden justify-between items-center">
            <OurServices text="WEB" icon={web} />
            <OurServices text="ANDROID" icon={android} />
            <OurServices text="IOS" icon={ios} />
          </div>
          <div className="lg:flex hidden justify-around items-center mt-8">
            <motion.div
              className="flex cursor-pointer hover:shadow-xl hover:shadow-[#2EE0FC] flex-col py-4 px-6 gap-2 border border-[#2EE0FC] duration-300"
              whileHover={{ scale: 1.03 }}
            >
              <Image
                src={hosting}
                alt="web"
                width={65}
                height={65}
                className="mx-auto text-base"
              />
              <h2 className="w-full flex text-center">
                HOSTING/
                <br />
                DOMAIN
              </h2>
            </motion.div>
            <OurServices text="PORTAL" icon={portal} />
          </div>
        </div>
      </div>

      <div className="  w-full absolute lg:bottom-0 -bottom-16 bg-gradient-to-t from-slate-300 via-slate-600 to-[#000E36] h-28" />
    </div>
  );
};

export default WhoWeAre;
