import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDot } from "react-icons/rx";

import tasarım3 from "../../../../public/images/slider/tasarım3.png";
import tasarım4 from "../../../../public/images/slider/tasarım4.png";
import tasarım9 from "../../../../public/images/slider/tasarım9.png";
import konf from "../../../../public/images/slider/konf.jpeg";
import maktek from "../../../../public/images/slider/maktek2.jpeg";




import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

function Banner() {
  const router = useRouter();

  const slides = [
    {
      source: tasarım4,
      text: "Mobil Uyumlu Web Tasarımı ve SEO Stratejileri İle Dönüşüm Odaklı Başarıyı Yakalayın.",
    },
    {
      source: tasarım9,
      text: "Her İhtiyaca Uygun, Mobil Uygulama İnovasyonuyla Dönüşümü Sağlayın",
    },
    {
      source: tasarım3,
      text: "Kârınızı artırın ve işinizi daha iyi yönetin. Stok takip ve muhasebe konusundaki en iyi çözümü keşfedin!",
    },
    {
      source: konf,
      text: "Siz de Dijital Dönüşümün Bir Parçası Olun.",
    },
    {
      source: maktek,
      text: "Her Sektör İçin Özel Çözümler, Tek Entegre Yaklaşım.",
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + slides.length) % slides.length;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % slides.length;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const currentSlide = slides[currentIndex];

  const bannerStyle = {
    backgroundImage: `url(${currentSlide.source})`,
  };

  useEffect(() => {
    // Slide'ları otomatik olarak değiştirmek için bir zamanlayıcı kullanın
    const interval = setInterval(nextSlide, 4000); // 5 saniyede bir değiştirme
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <AnimatePresence initial={false} custom={currentIndex} >
      <div
        className="h-[480px] w-full m-auto relative group bg-no-repeat bg-cover bg-center backdrop-blur-xl duration-300"
        style={{ backgroundImage: `url(${currentSlide.source.src})` }}
      >
        <div className="w-full h-full bg-opacity-60 bg-black flex flex-col justify-center pt-10 md:pt-0 items-center backdrop-blur-sm text-white text-2xl px-12">
          <p className="md:text-3xl  text-2xl font-bold text-center">
            {currentSlide.text}
          </p>
          <div className="flex justify-between mt-8 gap-6">
            <motion.button
              className="px-4 bg-green-900 py-2 rounded-md"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => router.push("/iletisim")}
            >
              İletişim
            </motion.button>
            <motion.button
              className="px-4 bg-[#120E8C] py-2 rounded-md"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => router.push("/urunler")}
            >
              Ürünlerimiz
            </motion.button>
          </div>
        </div>

        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactLeft onClick={prevSlide} size={30} />
        </div>

        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactRight onClick={nextSlide} size={30} />
        </div>

        <div className="flex top-4 justify-center py-2">
          {slides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className="text-2xl cursor-pointer"
            >
              <RxDot />
            </div>
          ))}
        </div>
      </div>
    </AnimatePresence>
  );
}

export default Banner;
