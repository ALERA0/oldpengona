import React from "react";
import ozeltasarim from "../../../../public/icons/whyUs/ozeltasarim.svg";
import seo from "../../../../public/icons/whyUs/seo.svg";
import adminpanel from "../../../../public/icons/whyUs/adminpanel.svg";
import guvenlik from "../../../../public/icons/whyUs/guvenlik.svg";
import mobiluyum from "../../../../public/icons/whyUs/mobiluyum.svg";
import hizli from "../../../../public/icons/whyUs/hizli.svg";


import WhyUsCard from "./WhyUsCard";

const WhyUs = () => {
  return (
    <div className="w-full flex flex-col bg-gradient-to-b from-[#BDC0C9] to-[#BDC0C900] lg:mt-0 mt-14 md:mt-10 md:px-20  ">
      <div className="flex justify-center items-center py-12 ">
        <h2 className="text-6xl font-bold text-center">
          Neden Bizi Tercih Etmelisiniz ?
        </h2>
      </div>
      <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  py-6 gap-6 ">
        <WhyUsCard
          icon={ozeltasarim}
          text="Özelleştirilmiş tasarımlarımızla sizin için eşsiz ve farklı bir marka deneyimi sunuyoruz."
          header="Özel Tasarım"
        />
        <WhyUsCard
          icon={seo}
          text="İnternet sitenizi arama motorlarına uyumlu şekilde kuruyor ve site içi SEO optimizasyonunu yapıp teslim ediyoruz. Böylece hedef kitlenizin sizi daha kolay bulmasını sağlıyoruz."
          header="SEO Uyumlu"
        />
        <WhyUsCard
          icon={mobiluyum}
          text="Sitenizi masaüstü, tablet ve telefonlarda sorunsuz bir şekilde çalışacak şekilde kuruyor ve teslim ediyoruz, böylece kullanıcılarınız her cihazda mükemmel deneyim yaşayabilir."
          header="Mobil Uyumlu"
        />
        <WhyUsCard
          icon={adminpanel}
          text="İnternet sitenizi arama motorlarına uyumlu şekilde kuruyor ve site içi SEO optimizasyonunu yapıp teslim ediyoruz. Böylece hedef kitlenizin sizi daha kolay bulmasını sağlıyoruz."
          header="Yönetim Paneli"
        />
        <WhyUsCard
          icon={guvenlik}
          text="Özelleştirilmiş tasarımlarımızla sizin için eşsiz ve farklı bir marka deneyimi sunuyoruz."
          header="Üst Düzey Güvenlik"
        />
        <WhyUsCard
          icon={hizli}
          text="İnternet sitenizi arama motorlarına uyumlu şekilde kuruyor ve site içi SEO optimizasyonunu yapıp teslim ediyoruz. Böylece hedef kitlenizin sizi daha kolay bulmasını sağlıyoruz."
          header="Yüksek Hızlı"
        />
      </div>
    </div>
  );
};

export default WhyUs;
