import Stok from "@/src/components/Home/Stok/Stok";
import Head from "next/head";

import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import favicon from "../../../public/images/favicon.png";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { status: authStatus } = useSelector(
    (state) => state.auth
  );

  const accessToken = typeof window !== 'undefined' ? localStorage.getItem("accessToken") : null;

  useEffect(() => {
    if (!accessToken) {
      router.push("/stokTakip/login");
    }
  }, [accessToken]);

  return (
    <>
      <Head>
        <title>Pengona Software</title>
        <meta name="description" content="Generated by Pengona" />
        <link rel="icon" href="../../../public/images/favicon.png" type="image/png" />
      </Head>
      <main className="w-full flex flex-col lg:px-8 lg:py-9 md:px-6 md:py-6 px-0 bg-blue-gray-100 min-h-full  ">
        <Stok />
      </main>
    </>
  );
}
