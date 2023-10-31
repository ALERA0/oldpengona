import { Montserrat } from "next/font/google";
import Head from "next/head";
import "../styles/globals.css";
import { Provider } from "react-redux";

import Navbar from "../components/Navbar/Navbar";
import Menu from "../components/Home/SideBar/Menu";
import { useRouter } from "next/router";
import { store } from "../redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createContext, useState } from "react";
import Footer from "../components/Footer";
import MainNavbar from "../components/MainNavbar";
import MainFooter from "../components/MainFooter";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-mont",
});

export const AppContext = createContext();

export default function App({ Component, pageProps }) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const isLoginPage = router.pathname === "/stokTakip/login";
  const isStokTakipPage = router.pathname.startsWith("/stokTakip");


  return (
    <Provider store={store}>
      <AppContext.Provider value={{ searchQuery, setSearchQuery }}>
        <Head>
          {" "}
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="shortcut-icon" href="../../public/favicon.ico" />
        </Head>
        {!isStokTakipPage ? (
          <main
            className={`${montserrat.variable} font-mont bg-light w-full min-h-screen  `}
          >
            <MainNavbar />
            <Component {...pageProps} />
            <MainFooter />
          </main>
        ) : (
          <main
            className={`${montserrat.variable} font-mont bg-light w-full min-h-screen flex overflow-hidden  `}
          >
            <div className="flex">{!isLoginPage && <Menu />}</div>
            {!isLoginPage && (
              <div className="flex flex-col w-full ">
                <Navbar />
                <Component {...pageProps} />
                <ToastContainer position="top-right" />
              </div>
            )}
            {isLoginPage && (
              <div>
                <Component {...pageProps} />
                <ToastContainer position="top-right" />
              </div>
            )}
            <Footer />{" "}
          </main>
        )}
      </AppContext.Provider>
    </Provider>
  );
}
