import React, { useState } from "react";
import inventory from "../../../public/images/inventory.png";
import logo from "../../../public/images/logo.jpg";
import Image from "next/image";
import { Alert, Button, Input } from "antd";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { authLogin, refreshToken, registerProcess } from "../../api";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { resetAuth } from "../../redux/slice/auth-slice";
import {
  showToastErrorMessage,
  showToastSuccesMessage,
} from "@/src/components/ToastComponent";
import { resetRegister } from "@/src/redux/slice/register-slice";

export const login = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const isValidEmail = (email) => {
    // Basit bir e-posta doğrulama işlemi
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const router = useRouter();
  const { status: registerStatus, message: registerMessage } = useSelector(
    (state) => state.register
  );
  const [registerOrLogin, setRegisterOrLogin] = useState(false);
  const [loginOrMain, setLoginOrMain] = useState(false);

  const handleregisterOrLogin = () => {
    setRegisterOrLogin(!registerOrLogin);
    setEmail("");
    setUsername("");
    setPassword("");
  };
  const { status: authStatus, message: authMessage } = useSelector(
    (state) => state.auth
  );

  const handleLogin = async () => {
    if (registerOrLogin) {
      if (!isValidEmail(email)) {
        showToastErrorMessage("Geçerli bir e-posta adresi girin");
        return; // Geçersiz e-posta adresi olduğunda işlemi durdur
      }
      await dispatch(registerProcess({ username, password, email }));
    } else {
      await dispatch(authLogin({ email, password }));
      await setLoginOrMain(true);
    }
  };

  useEffect(() => {
    if (authStatus === "success") {
      router.push("/stokTakip");
    } else if (authStatus === "error") {
      showToastErrorMessage(authMessage);
      dispatch(resetAuth());
    }
    if (registerStatus === "success") {
      showToastSuccesMessage("Kayıt Başarılı");
      dispatch(resetRegister());
    } else if (registerStatus === "error") {
      showToastErrorMessage(registerMessage);
      dispatch(resetRegister());
    }
    if (registerStatus === "success") {
      setRegisterOrLogin(false);
    }
  }, [authStatus, authMessage, registerStatus, registerMessage]);

  // useEffect(() => {
  //   dispatch(resetAuth());
  // }, [router]);

  return (
    <div className="w-full h-screen  flex justify-center items-center  ">
      <div className="w-full  h-full py-24 lg:px-12 md:px-6 px-2 flex justify-center items-center  bg-[#DEE3F0] ">
        <div className="grid grid-cols-3 bg-white">
          <div className="w-full lg:col-span-1 col-span-3 h-full flex flex-col   lg:px-6 py-8">
            <Link href="/">
              <Image
                src={logo}
                className=" w-2/5 rounded-lg flex justify-center mx-auto"
                alt="logo"
              />
              <p className="text-center font-semibold mt-2 underline">
                Ana Sayfaya Dön
              </p>
            </Link>
            <div className="h-4/5 w-full flex flex-col lg:pt-28 2xl:px-8 md:pt-14 lg:px-2 pt-10 px-2 gap-6 items-center">
              <h2 className="lg:text-4xl text-center w-full  md:text-2xl text-xl font-bold">
                Hoşgeldiniz
              </h2>
              <p className="text-lg font-semibold">
                {!registerOrLogin
                  ? "Lütfen Giriş Yapınız"
                  : "Lütfen Kayıt Olunuz"}
              </p>
              {registerOrLogin && (
                <input
                  className="w-full h-12 rounded-lg border-2 pl-4 border-gray-300 "
                  type="username"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              )}
              <input
                className="w-full h-12 rounded-lg border-2 pl-4 border-gray-300 "
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                className="w-full h-12 rounded-lg border-2 pl-4 border-gray-300 "
                type="password"
                placeholder="Şifre"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div
                onClick={handleregisterOrLogin}
                className="cursor-pointer hover:text-blue-500 duration-200 flex flex-col text-center"
              >
                {!registerOrLogin ? (
                  <div>
                    <h2>Henüz bir hesabınız yok mu ?</h2>
                    <h2>Kayıt Ol</h2>
                  </div>
                ) : (
                  <div>
                    <h2>Hesabınız var mı ?</h2>
                    <h2>Giriş Yap</h2>
                  </div>
                )}
              </div>
              <div
                className="w-full h-12 rounded-lg duration-300 hover:text-[#000E36] bg-[#000E36] text-white text-center cursor-pointer flex justify-center font-bold hover:bg-[#FF8A00] items-center"
                onClick={handleLogin}
              >
                {registerOrLogin ? "Kayıt Ol" : "Giriş Yap"}
              </div>
            </div>
          </div>
          <div className="w-full lg:col-span-2  lg:flex hidden justify-center items-center">
            <Image
              src={inventory}
              className=" w-4/5 hidden  lg:flex justify-center items-center "
              alt="inventory"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default login;
