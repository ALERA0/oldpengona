import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import web from "../../../public/icons/webIcons/web.svg";
import mobiluyum from "../../../public/images/telefon.svg";
import hosting from "../../../public/icons/webIcons/hosting.svg";
import portal from "../../../public/icons/webIcons/portal.svg";
import HizmetlerimizCard from "./HizmetlerimizCard";

const Sektorler = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center lg:px-24 md:px-12 px-6 lg:py-12 md:py-6 py-4">
      <h2 className="w-full text-center  text-3xl mb-8 font-bold text-[#001653] ">
        Hizmet Verdiğimiz Sektörler
      </h2>
      <div className="w-full lg:grid lg:grid-cols-2 flex flex-col gap-4">
        <HizmetlerimizCard
          icon={web}
          text="Yerli ve Milli Savunma anlayışımızla, savunma sanayi firmalarımızın tedarikçi portalı, 
          OEE (Overall Equipment Effectiveness) verimlilik takip yazılımları, personel takip sistem yazılımlarını geliştiriyoruz."
          title="Savunma Sanayi"
        />

        <HizmetlerimizCard
          icon={mobiluyum}
          text="Otomotiv Ana ve Yan Sanayi kuruluşlarımızın ihtiyaçları doğrultusunda geliştirdiğimiz ürün takip sistemleri ile yurtiçi ve yurtdışı müşterileriniz her ürünün oluşmasını izleyebilmektedir."
          title="Otomotiv Sanayi"
        />
        <HizmetlerimizCard
          icon={portal}
          text="Ülkemizde gelişmekte olan Enerji firmaları için özel tasarlanmış yazılımlar geliştirmekteyiz."
          title="Enerji Sektörü"
        />
        <HizmetlerimizCard
          icon={hosting}
          text="Makina imalatçıları ve/veya İmalat sektöründe faliyet gösteren firmalarımızın yazılım, donanım, erp, mrp, muhasebe, crm gibi çeşitli ihtiyaçlarına entegre edilmiş yazılımlar sunmaktayız."
          title="Makina - İmalat Sektörü"
        />
        <HizmetlerimizCard
          icon={hosting}
          text="Ülkemizin kalkınmasında lokomotiv görevi yapan KOBİ'lerimiz için stok takip yazılımları, personel takip yazılımları, websitesi, email, hosting, domain hizmetlerini vermekteyiz."
          title="Kobiler İçin Yazılımlar"
        />
        <HizmetlerimizCard
          icon={hosting}
          text="E-Ticaret çözümleri sunan Pengona Yazılım, 
          e-ticaret platformlarına entegre edilebilen çözümleri ile, 
          Yemek Sepeti, Getir Yemek, Trendyol Yemek, Hepsiburada, N11 gibi online platformlara entegre olabilmektedir."
          title="E-Ticaret Çözümleri"
        />
      </div>
    </div>
  );
};

export default Sektorler;
