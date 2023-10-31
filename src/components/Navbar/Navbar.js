import { AppContext } from "@/src/pages/_app";
import React, { useContext, useEffect, useState } from "react";
import DebouncedInput from "./DebouncedInput"; // Bu satırı eklemeyi unutmayın
import Image from "next/image";
import logout from "../../../public/images/logout.png";
import { useDispatch, useSelector } from "react-redux";
import { authLogOut } from "@/src/api";
import { useRouter } from "next/router";
import { resetAuthLogout } from "@/src/redux/slice/auth-logout-slice";
import userImage from "../../../public/images/user2.png";
import { resetAuth } from "@/src/redux/slice/auth-slice";

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loginOrMain, setLoginOrMain] = useState(false);

  const { setSearchQuery } = useContext(AppContext);

  const handleSearch = (inputValue) => {
    setSearchQuery(inputValue);
  };

  const handleLogout = async () => {
    await dispatch(authLogOut());
    await dispatch(resetAuth());
  };
  const { status: LogoutStatus } = useSelector((state) => state.authLogOut);

  useEffect(() => {
    if (LogoutStatus === "success") {
      router.push("/stokTakip/login");
      dispatch(resetAuthLogout());
    }
  }, [LogoutStatus]);

  return (
    <div className="w-full flex justify-between py-9 items-center md:pl-8  pl-6  pr-2  bg-dark-purple md:h-28 h-16  text-white">
      <div className="w-10/12">
        <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
          <div className="grid place-items-center h-full w-12 text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <div className="md:pr-4 pr-1 w-full flex ">
            <DebouncedInput onInput={handleSearch} />
          </div>
        </div>
      </div>
      <div className="flex md:hidden w-16 flex-col gap-1  items-center cursor-pointer rounded-md  hover:bg-blue-300 duration-300 ml-2 ">
        <Image
          src={logout}
          onClick={handleLogout}
          width={20}
          height={20}
          className="flex justify-center items-center"
        />
        <p className="md:text-base text-xs text-center">Çıkış Yap</p>
      </div>
      <div className="md:flex hidden flex-col gap-1  items-center cursor-pointer rounded-full px-2 py-4 hover:bg-blue-300 duration-300 ">
        <Image src={logout} onClick={handleLogout} />
        <p>Çıkış Yap</p>
      </div>
    </div>
  );
};

export default Navbar;
