import Link from "next/link";
import React, { useState } from "react";
import phoneIcon from "../../public/icons/telephone.png";
import loginIcon from "../../public/images/login.png";

import Image from "next/image";
import { motion } from "framer-motion";
import menuIcon from "../../public/icons/hamburger.svg";
import xIcon from "../../public/icons/xIcon.svg";
import CustomLink from "./MainNavbar/CustomLink";
import logo from "../../public/images/logo.jpg";
import Sosyal from "./SosyalMedya/Sosyal";




const MainNavbar = () => {
  const [openMenu, setOpenMenu] = useState(false);


  const phoneNumber = process.env.NEXT_PUBLIC_TEL_NUMBER;

  const handlePhoneClick = () => {
    window.location.href = `tel:+905433524256`;
  };





  return (
    <header className="w-full flex-col  ">
      {/* Navbar üstündeki mavi kısım */}
      <div className="w-full md:flex hidden justify-end items-center  bg-[#000E36] py-1 lg:px-38 md:px-12 px-7 gap-4">
        <Sosyal />
      </div>
      <div className="flex  w-full justify-between items-center xl:px-30 md:px-2 md:py-8 px-2 py-2 bg-gray-100 border border-b-4 border-t-0 ">
        {/* Responsive olduğu durumdaki giriş iconu*/}
        <motion.div
          className="md:hidden flex items-center  py-2 px-1 rounded-lg border border-solid bg-[#050F56]  hover:shadow-xl "
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.9 }}
        >
          <a href="/stokTakip/login"  className="flex flex-col ">
            <Image src={loginIcon} alt="telephone" width={30} height={30} className="mx-auto mb-1" />
            <p className="text-xs font-semibold text-white">Giriş Yap</p>
          </a>
        </motion.div>
        {/* LOGO*/}
        <a href="/" className="rounded-lg lg:px-6 md:px-3 py-1 bg-[#000E36]  ">
          
          <Image
            src={logo}
            alt="logo"
            width={220}
            height={50}
            className="rounded-lg w-44 "
          />
        </a>
        {/* Navbardaki Seçenekler*/}
        <nav className="flex  items-center  ">
          <CustomLink
            href="/"
            title="Ana Sayfa"
            className="md:mr-1 lg:mr-2 xl:mr-4   lg:flex hidden text-base lg:text-sm xl:text-lg"
          />
          <CustomLink
            href="/kurumsal"
            title="Kurumsal"
            className="md:mr-1 lg:mr-2 xl:mr-4  lg:flex hidden text-base lg:text-sm xl:text-lg"
          />
          {/* <CustomLink
            href="/hizmetler"
            title="Hizmetler"
            className="md:mr-1 lg:mr-2 xl:mr-4   lg:flex hidden text-base lg:text-sm xl:text-lg"
          /> */}
          <CustomLink
            href="/urunler"
            title="Ürünler"
            className="md:mr-1 lg:mr-2 xl:mr-4   lg:flex hidden text-base lg:text-sm xl:text-lg"
          />
          <CustomLink
            href="/dokumantasyon"
            title="Dökümantasyon"
            className="md:mr-1 lg:mr-2 xl:mr-4  lg:flex hidden text-base lg:text-sm xl:text-lg"
          />
          <CustomLink
            href="/iletisim"
            title="İletişim"
            className="md:mr-1 lg:mr-2 xl:mr-4  lg:flex hidden text-base lg:text-sm xl:text-lg"
          />
          {/* Telefon Numarası yazılan Component*/}
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.9 }}
            className="lg:relative absolute left-0  "
          >
            <div
              href="/"
              className="lg:flex items-center bg-transparent py-3 lg:px-5 md:px-2 rounded-lg border border-solid border-[#0079FF] hover:shadow-xl xl:ml-4 lg:ml-3 md:ml-2 hidden cursor-pointer"
              onClick={handlePhoneClick}
            >
              {/* Icon ve Yazı*/}
              <Image src={phoneIcon} alt="telephone" width={20} height={20} />
              <p className="text-[#0079FF] ml-2 md:flex hidden ">
                +905433524256
              </p>
            </div>
          </motion.div>
          {/* Responsive olduğu durumdaki menu iconu  */}
          <motion.div
            className="lg:hidden  border border-solid border-[#164BD4] p-4 rounded-full cursor-pointer hover:shadow-xl z-20"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpenMenu(!openMenu)}
          >
            {/* X ya da menu iconu belirleme kısmı */}
            <Image
              src={openMenu ? xIcon : menuIcon}
              width={20}
              height={20}
              alt="menu"
              className="lg:hidden"
            />
          </motion.div>
        </nav>
      </div>
      {/* Eğer ki menu iconuna basılırsa açılan component */}
      <div className="lg:hidden duration-300 ease-in-out">
        {openMenu && (
          <div className="absolute right-0 top-0 w-1/2 h-full  bg-light  opacity-90 border-l-2  z-10 duration-500 ease-in-out transition-all">
            <div className="flex flex-col  h-full mt-36 duration-300 transition-all ease-in-out">
              <CustomLink
                href="/"
                title="Ana Sayfa"
                className=" my-4 text-center   bg-slate-300 rounded-md py-2 "
              />
              <CustomLink
                href="/kurumsal"
                title="Kurumsal"
                className=" my-4  text-center bg-slate-300 rounded-md py-2 "
              />
              <CustomLink
                href="/urunler"
                title="Ürünler ve Hizmetler"
                className=" my-4 text-center bg-slate-300 rounded-md py-3 text-base "
              />
              <CustomLink
                href="/iletisim"
                title="İletişim"
                className=" my-4 text-center           rounded-md py-2 bg-slate-300
              "
              />
              <CustomLink
                href="/stokTakip/login"
                title="Giriş Yap"
                className=" my-4 text-center           rounded-md py-2 bg-slate-300
              "
              />
              
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default MainNavbar;