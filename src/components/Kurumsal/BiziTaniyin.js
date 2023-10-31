import React from "react";
import alp from "../../../public/images/bizkimiz/alp.jpeg";
import selin from "../../../public/images/bizkimiz/selin.jpeg";
import mehmet from "../../../public/images/bizkimiz/mehmet.jpeg";
import yigit from "../../../public/images/bizkimiz/yigit.jpeg";
import Image from "next/image";

const BiziTaniyin = () => {
  return (
    <div className="w-full lg:px-24 md:px-10 px-4 py-6">
      <div className="flex flex-col w-full">
        <h2 className="text-center lg:text-5xl md:text-4xl text-3xl font-bold mb-4">Ekibimiz</h2>
        <div class="grid mb-8 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 md:mb-12 md:grid-cols-2">
          <figure class="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-tl-lg md:border-r dark:bg-gray-800 dark:border-gray-700">
            <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
              <p class="my-4">
                Selçuk Üniversitesi Makina Mühendisliği ve Toronto Üniversitesi
                Computer Science bölümü mezunu. Kurucu ortaklardan biri.
              </p>
            </blockquote>
            <figcaption class="flex items-center justify-center space-x-3">
              <Image
                class="rounded-full w-9 h-9"
                src={mehmet}
                alt="profile picture"
              />
              <div class="space-y-0.5 font-medium dark:text-white text-left">
                <div>Mehmet ATMACA</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  Genel Müdür
                </div>
              </div>
            </figcaption>
          </figure>
          <figure class="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-tr-lg dark:bg-gray-800 dark:border-gray-700">
            <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
              <p class="my-4">
                Selçuk Üniversitesi Elektrik Elektronik Mühendisliği bölümü
                mezunu. Kurucu ortaklardan biri ve Mobil Application Developer
                olarak aramızda.
              </p>
            </blockquote>
            <figcaption class="flex items-center justify-center space-x-3">
              <Image
                class="rounded-full w-9 h-9"
                src={selin}
                alt="profile picture"
              />
              <div class="space-y-0.5 font-medium dark:text-white text-left">
                <div>Selin ÇALIŞKAN</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  Yazılım Müdürü
                </div>
              </div>
            </figcaption>
          </figure>
          <figure class="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-bl-lg md:border-b-0 md:border-r dark:bg-gray-800 dark:border-gray-700">
            <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
              <p class="my-4">
                Selçuk Üniversitesi Bilgisayar Mühendisliği bölümü 4.sınıf
                öğrencisi. Kurucu ortaklardan biri ve Fullstack Developer olarak
                aramızda.
              </p>
            </blockquote>
            <figcaption class="flex items-center justify-center space-x-3">
              <Image
                class="rounded-full w-9 h-9"
                src={alp}
                alt="profile picture"
              />
              <div class="space-y-0.5 font-medium dark:text-white text-left">
                <div>Alp Eren Arıcı</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  Yazılım Müdürü
                </div>
              </div>
            </figcaption>
          </figure>
          <figure class="flex flex-col items-center justify-center p-8 text-center bg-white border-gray-200 rounded-b-lg md:rounded-br-lg dark:bg-gray-800 dark:border-gray-700">
            <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
              <p class="my-4">
                You have many examples that can be used to create a fast
                prototype for your team."
              </p>
            </blockquote>
            <figcaption class="flex items-center justify-center space-x-3">
              <Image
                class="rounded-full w-9 h-9"
                src={yigit}
                alt="profile picture"
              />
              <div class="space-y-0.5 font-medium dark:text-white text-left">
                <div>Yiğit Can AKÇAY</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  Yazılım Mühendisi
                </div>
              </div>
            </figcaption>
          </figure>
        </div>

        <div className="w-full col-span-2 flex flex-col   text-[#000E36] tracking-wide">
          <h2 className="lg:text-5xl text-3xl text-center  font-bold lg:mb-14 md:mb-8 mb-5">
            Biz Kimiz?
          </h2>
          <p className="text-xl font-semibold mb-2">
            Pengona Yazılım ailesi olarak, profesyonel ve yenilikçi çözümler
            sunarak müşteri memnuniyetini ön planda tutuyoruz. Hosting, Domain,
            Web tasarım yazılımı, Android/IOS mobil uygulama tasarım yazılımı ve
            portal gibi geniş bir hizmet yelpazesiyle müşterilerimize kapsamlı
            çözümler sunuyoruz.
          </p>
          <p className="text-xl font-semibold">
            Pengona Yazılım olarak, müşterilerimizin ihtiyaçlarını anlamak ve
            onlara en iyi hizmeti sunmak için uzman bir ekip ile çalışıyoruz.
            İşimizi tutkuyla yapıyor ve en son teknolojik gelişmeleri takip
            ederek projelerimize yansıtıyoruz.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BiziTaniyin;
