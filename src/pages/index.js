import Head from "next/head";
import Banner from "../components/HomePage/Banner/Banner";
import WhoWeAre from "../components/HomePage/WhoWeAre/WhoWeAre";
import WhyUs from "../components/HomePage/WhyUs/WhyUs";
import Referanslar from "../components/HomePage/Referanslar/Referanslar";

export default function Home() {
  return (
    <>
      <Head>
        <title>Pengona Software</title>
        <meta name="description" content="Generated by Pengona" />
        
        
      </Head>
      <main className="w-full mb-16 flex flex-col items-center justify-center  ">
        <Banner />
        <WhoWeAre />
        <WhyUs />
        <Referanslar/>
      </main>
    </>
  );
}
