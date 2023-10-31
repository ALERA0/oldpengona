import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import web from "../../../public/icons/webIcons/web.svg";
import mobiluyum from "../../../public/images/telefon.svg"
import hosting from "../../../public/icons/webIcons/hosting.svg";
import portal from "../../../public/icons/webIcons/portal.svg";
import HizmetlerimizCard from "./HizmetlerimizCard";



const Hizmetlerimiz = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center lg:px-24 md:px-12 px-6 lg:py-12 md:py-6 py-4">
      <h2 className="w-full text-center  text-3xl mb-8 font-bold text-[#001653] ">
        Hizmetlerimiz
      </h2>
      <div className="w-full lg:grid lg:grid-cols-2 flex flex-col gap-4">
        
        <HizmetlerimizCard icon={web} text="Web tasarımında uzman ekibimiz, etkileyici ve kullanıcı dostu web siteleri oluşturarak işletmenizin dijital varlığını güçlendirir." title="Web"/>
        
        <HizmetlerimizCard icon={mobiluyum} text="Mobil uygulama geliştirme konusunda uzmanlaşmış ekibimiz, iOS ve Android platformları için yenilikçi ve işlevsel uygulamalar tasarlar, böylece müşterilerinizle etkileşimi artırmanıza yardımcı olur." title="Mobil Uygulama" />
        <HizmetlerimizCard icon={portal} text="Kapsamlı portal çözümlerimiz, işletmenizin iç ve dış kullanıcılarının verimli bir şekilde bilgi alışverişi yapabildiği güvenilir ve ölçeklenebilir bir platform sunar." title="Portal" />
        <HizmetlerimizCard icon={hosting} text="Yüksek hızlı ve güvenli hosting altyapımız ile web sitenizi kesintisiz bir şekilde yayınlar, aynı zamanda işletmeniz için uygun ve tanımlanabilir bir alan adı sağlarız." title="Hosting / Domain" />
        
      </div>
    </div>
  );
};

export default Hizmetlerimiz;
