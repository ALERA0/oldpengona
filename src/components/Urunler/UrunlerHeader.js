import React from "react";

const UrunlerHeader = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center lg:px-24 md:px-12 px-4 py-12 text-[#001653]">
      <h2 className="w-full text-center lg:text-5xl md:text-4xl text-3xl mb-8 font-bold ">
        ÜRÜNLER VE HİZMETLER
      </h2>
      <p className="w-full text-center lg:text-xl md:text-lg text-base mb-8">
        <span className="font-semibold">Pengona Yazılım</span> olarak, işinizi
        ve markanızı güçlendirmek için kaliteli hizmetler sunmaktanyız. Sizleri
        Pengona Yazılım ailesinin bir parçası olarak görmekten mutluluk
        duyarız..
      </p>
      <div className="w-full lg:grid lg:grid-cols-3 flex flex-col gap-4">
        <div>
          <h2 className="text-4s font-bold text-center text-[#001653] mb-2">
            Kurumsal Mühendislik
          </h2>
          <p>
            Pengona Yazılım ve Mühendislik 2006 yılında ticari hayatına başlamış
            yazılım sektöründe hizmet veren ve deneyimli kadrosu ile en güncel
            yazılım dillerini kullanarak sektörün ihtiyacı uygulamaları
            geliştiren bir firmadır.
          </p>
        </div>
        <div>
          <h2 className="text-4s font-bold text-center text-[#001653] mb-2">
            Satış Sonrası Hizmetlerimiz
          </h2>
          <p>
            Bizimle çalışmayı tercih eden müşterilerimizin 7/24 yanındayız ve
            anında destek hizmetlerimizle sürekli online kalmalarını
            sağlamaktayız. İşletmelerin gereksinimlerini karşılamak yazılım
            geliştirme sürecinde başlayan ve uygulamalarımız kullanıldığı sürece
            devam eden hizmetimizdir. Firmaların yüksek oranda verimliliğinin
            sağlanması amacı ile Geliştirme, Güncelleme ve Uyarlama Hizmeti,
            Personel Eğitimi, Teknik Danışmanlık ve Telefonla Danışmanlık
            hizmetleriyle kaliteli hizmet sunmaktadır
          </p>
        </div>
        <div>
          <h2 className="text-4s font-bold text-center text-[#001653] mb-2">
            Müşteri Memnuniyeti
          </h2>
          <p>
            Yazılım Mühendisliği hizmetleri üretmek amacıyla 2006 yılında
            kurulmuş olan Pengona Yazılım, geliştirdiği yazılımlar ile
            firmaların katma değer sağlaması ve net sonuçlara ulaşmalarını
            sağlamaktadır. Pengona yazılım müşteri memnuniyetini ön planda
            tutarken her daim müşterilerine bir telefon kadar uzakta hizmet
            vermek için beklemektedir.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UrunlerHeader;
