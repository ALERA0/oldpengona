import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

export default function Politikalar() {
  return (
    <div className="w-full  pt-16 lg:px-24 md:px-8 px-4">
      <div className="w-full flex justify-between md:gap-8 gap-2  ">
        <div className="w-1/2">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-slate-300 md:px-4 px-1 py-2 text-left text-sm font-medium text-[#000E36] hover:bg-blue-300 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 bg-gray-300 duration-300">
                  <span className="text-sm">Gizlilik Politikası</span>
                  <ChevronUpIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-[#000E36] duration-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 ">
                  <p>
                    <span className="font-bold ">Gizlilik Politikası</span>
                    <br /> Pengona Yazılım Şirketi olarak kişisel gizlilik
                    haklarınıza saygı duyuyor ve sitemizde geçirdiğiniz süre
                    zarfında bunu sağlamak için çaba sarfediyoruz. Kişisel
                    bilgilerinizin güvenliği ile ilgili tanımlar aşağıda
                    açıklanmış ve siz değerli kullanıcılarımızın bilgilerine
                    sunulmuştur.Elektronik posta adresiniz, (yasal haller
                    dışında) hiçbir gerekçe ile başka kuruluşlara
                    dağıtılmayacaktır.
                    <br />
                    <span className="font-bold ">Çerezler</span>
                    <br /> "Cookie - Çerez" kelimesi web sayfası sunucusunun
                    sizin bilgisayarınızın hard diskine yerleştirdiği ufak bir
                    text dosyasını tanımlamak için kullanılmaktadır. Sitemizin
                    bazı bölümlerinde kullanıcı kolaylığı sağlamak için çerez
                    kullanılıyor olabilir. Bu tamamen sizin izninizle
                    gerçekleşiyor olup, isteğiniz dahilinde internet
                    tarayıcınızın ayarlarını değiştirerek bunu engellemeniz
                    mümkündür. <br />
                    <span className="font-bold">Dış Bağlantılar</span>
                    <br /> pengona.com sitesi, internetin doğası gereği birçok
                    farklı internet adresine ve sosyal medya hesaplarımıza
                    bağlantı vermektedir. pengona.com link verdiği sitelerin
                    içeriklerinden veya gizlilik prensiplerinden sorumlu
                    değildir. pengona.com, işbu "Gizlilik Politikası"
                    hükümlerini dilediği zaman pengona.com web sitesinde
                    yayınlamak suretiyle değiştirebilir. pengona.com 'nin
                    değişiklik yaptığı Gizlilik Politikası hükümleri pengona.com
                    web sitesinde yayınlandığı tarihte yürürlülük kazanır.
                  </p>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
        <div className="w-1/2 ">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-slate-300 px-4 py-2 text-left text-sm font-medium text-[#000E36] hover:bg-blue-300 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 bg-gray-300 duration-300">
                  <span>K.V.K.K.</span>
                  <ChevronUpIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-purple-500 duration-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                  <p>
                    <span className="font-bold">
                      KİŞİSEL VERİLERİN İŞLENMESİ VE KORUNMASI POLİTİKASI
                    </span>
                    <br />
                    GİRİŞ
                    <br />
                    1.1 Amaç ve Kapsam
                    <br />
                    Kişisel Verilerin Saklaması ve İmha Politikası ( Politika ),
                    Pengona Yazılım Şirketi (“Şirket”) tarafından kişisel
                    verileri işlenen; çalışan, çalışan adayı, bayi çalışanı,
                    bayi yetkilisi, çırak, tedarikçi, ürün veya hizmet alan
                    kişi, web sayfası ziyaretçisine ait kişisel verilerin T.C.
                    Anayasası, uluslararası sözleşmeler, 6698 sayılı Kişisel
                    Verilerin Korunması Kanunu (Kanun) ve diğer ilgili mevzuata
                    uygun olarak saklanması ve imha edilmesinin iş kurallarının
                    belirlenmesini ve duyurulmasını amaçlamaktadır.
                    <br />
                    <br />
                    <span className="font-bold">
                      KİŞİSEL VERİLERİN İŞLENMESİNDE GENEL İLKELER
                    </span>
                    <br />
                    Şirket tarafından Kişisel Veriler, Kanunda ve bu Politikada
                    öngörülen usul ve esaslara uygun olarak işlenir. Şirket,
                    Kişisel Verileri işlerken aşağıdaki ilkelerle hareket eder:
                    • Kişisel Veriler, ilgili hukuk kurallarına ve dürüstlük
                    kuralının gereklerine uygun olarak işlenir. • Kişisel
                    Verilerin doğru ve güncel olması sağlanır. Bu kapsamda
                    verilerin elde edildiği kaynakların belirli olması,
                    doğruluğunun teyit edilmesi, güncellenmesi gerekip
                    gerekmediğinin değerlendirilmesi gibi hususlar özenle
                    dikkate alınır. • Kişisel Veriler; belirli, açık ve meşru
                    amaçlarla işlenir. Amacın meşru olması, Şirketin işlediği
                    Kişisel Verilerin, yapmış olduğu iş veya sunmuş olduğu
                    hizmetle bağlantılı ve bunlar için gerekli olması anlamına
                    gelir. • Kişisel Veriler, Şirket tarafından belirlenen
                    amaçların gerçekleştirilebilmesi için amaçla bağlantılı
                    olup, amacın gerçekleştirilmesiyle ilgili olmayan veya
                    ihtiyaç duyulmayan kişisel verilerin işlenmesinden
                    kaçınılır. İşlenen veriyi, sadece amacın gerçekleştirilmesi
                    için gerekli olanla sınırlı tutar. Bu kapsamda işlenen
                    kişisel veriler, işlendikleri amaçla bağlantılı, sınırlı ve
                    ölçülüdür. • İlgili mevzuatta verilerin saklanması için
                    öngörülen bir süre bulunması halinde bu sürelere uyum
                    gösterir; aksi durumda kişisel verileri, ancak işlendikleri
                    amaç için gerekli olan süre kadar muhafaza edilir. Kişisel
                    verinin daha fazla muhafaza edilmesi için geçerli bir sebep
                    kalmaması durumunda, söz konusu veri silinir, yok edilir
                    veya anonim hale getirilir
                    <br />
                    <br />
                    <span className="font-bold">
                      KİŞİSEL VERİLERİN İŞLENME ŞARTLARI
                    </span>
                    <br />
                    Kişisel veriler, kanunun 5. Maddesi uyarınca Veri Sahibi’
                    nin açık rızası olmaksızın işlenemez. Ancak yine aynı
                    maddede yer alan düzenleme gereği; aşağıda yer alan
                    şartlardan birinin varlığı halinde Veri Sahibinin açık
                    rızası aranmaksızın kişisel veriler işlenecektir.
                    -Kanunlarda Açıkça Öngörülmesi Veri sahibinin kişisel
                    verileri, kanunda açıkça öngörülmekte ise diğer bir ifade
                    ile ilgili kanunda kişisel verilerin işlenmesine ilişkin
                    açıkça bir hüküm olması halinde işbu veri işleme şartının
                    varlığından söz edilebilecektir. Örn: İş Kanunu veya İş
                    Sağlığı ve Sosyal Güvenlik Kanunu hükümleri gereğince
                    çalışanın özlük dosyasının tutulması. -Fiili İmkânsızlık
                    Nedeniyle İlgilinin Açık Rızasının Alınamaması Fiili
                    imkânsızlık nedeniyle rızasını açıklayamayacak durumda olan
                    veya rızasına geçerlilik tanınmayacak olan kişinin
                    kendisinin ya da başka bir kişinin hayatı veya beden
                    bütünlüğünü korumak amacıyla kişisel verinin işlenmesinin
                    zorunlu olması halinde veri sahibinin kişisel verileri
                    işlenebilecektir. -Bir Sözleşmenin Kurulması veya İfasıyla
                    Doğrudan Doğruya İlgili Olması Bir sözleşmenin kurulması
                    veya ifasıyla doğrudan doğruya ilgili olması kaydıyla,
                    sözleşmenin taraflarına ait kişisel verilerin işlenmesinin
                    gerekli olması halinde kişisel veriler veri öznelerinin açık
                    rızaları olmadan şirket tarafından işlenebilir. -Şirketin
                    (Veri Sorumlusu) Hukuki Yükümlülüğünü Yerine Getirmesi İçin
                    Zorunlu Olması Şirketimizin hukuki yükümlülüklerini yerine
                    getirmesi için işlemenin zorunlu olduğu durumlarda veri
                    sahibinin kişisel verileri işlenebilecektir. Örn: çalışana
                    maaş ödenebilmesi için, çalışanın banka ve hesap
                    bilgilerinin alınması, evli olup olmadığının, bakmakla
                    yükümlü olduğu kişilerin, eşinin çalışıp çalışmadığının ve
                    sosyal sigorta bilgilerinin sorulması -Kişisel Verinin Veri
                    Sahibinin Kendisi Tarafından Alenileştirilmiş Olması Veri
                    sahibinin, kişisel verisini alenileştirmesi durumunda,
                    alenileştirme amacı ile sınırlı olmak kaydıyla kişisel veri
                    şirketimizce işlenebilecektir. -Bir Hakkın Tesisi veya
                    Korunması için Veri İşlemenin Zorunlu Olması Bir hakkın
                    tesisi, kullanılması veya korunması için veri işlemenin
                    zorunlu olması halinde veri sahibinin kişisel verileri
                    işlenebilecektir. Örn: çalışan tarafından açılan bir davada
                    ispat için bazı verileri kullanması -Veri Sahibinin Temel
                    Hak ve Özgürlüklerine Zarar Vermemek Kaydıyla Şirketimizin
                    Meşru Menfaatleri için Veri İşlenmesinin Zorunlu Olması
                    Kişisel veri sahibinin temel hak ve özgürlüklerine zarar
                    vermemek kaydıyla Şirketimizin meşru menfaatleri için veri
                    işlemesinin zorunlu olması halinde veri sahibinin kişisel
                    verileri işlenebilecektir. Örn: çalışanların temel hak ve
                    özgürlüklerine zarar vermemek kaydıyla, onların terfileri,
                    maaş zamları veya sosyal haklarının düzenlenmesinde ya da
                    işletmenin yeniden yapılandırılması sürecinde görev ve rol
                    dağıtımında esas alınmak üzere çalışanların kişisel
                    verilerinin işlenmesi.
                    <br />
                    <br />
                    <span className="font-bold">
                      ÖZEL NİTELİKLİ KİŞİSEL VERİLERİN İŞLENMESİ
                    </span>
                    <br />
                    Kişilerin ırkı, etnik kökeni, siyasi düşüncesi, felsefi
                    inancı, dini, mezhebi veya diğer inançları, kılık ve
                    kıyafeti, dernek, vakıf ya da sendika üyeliği, sağlığı,
                    cinsel hayatı, ceza mahkûmiyeti ve güvenlik tedbirleriyle
                    ilgili verileri ile biyometrik ve genetik verileri özel
                    nitelikli kişisel veridir. Kanun’un 6. Maddesi uyarınca özel
                    nitelikli kişisel veriler, veri sahibinin açık rızası
                    alınmadan işlenemez. Ancak kişilerin cinsel hayatı ve
                    sağlığı dışındaki özel nitelikli kişisel veriler kanunlarda
                    öngörülen durumlarda veri sahibinin açık rızası alınmaksızın
                    işlenebilecektir. Sağlık ve cinsel hayata ilişkin kişisel
                    veriler ise ancak kamu sağlığının korunması, koruyucu
                    hekimlik, tıbbi teşhis, tedavi ve bakım hizmetlerinin
                    yürütülmesi, sağlık hizmetleri ile finansmanın planlanması
                    ve yönetimi amacıyla, sır saklama yükümlülüğü altında
                    bulunan kişiler veya yetkili kurum veya kuruluşlar
                    tarafından ilgilinin açık rızası aranmaksızın işlenebilir.
                    Bütün durumlarda, özel nitelikli kişisel verilerin
                    işlenmesinde ayrıca kurul (Kişisel Verileri Koruma Kurulu)
                    tarafından belirlenen yeterli önlemlerin alınması şarttır.
                    Şirketimizde kanunların öngördüğü ölçüde çalışanlarımıza ait
                    sağlık bilgileri bulunmakta ve kanunlar kapsamında
                    işlenmektedir. Başka hiçbir şartla özel nitelikli kişisel
                    veri bulundurmamaya özen gösterilmektedir.
                    <br />
                    <br />
                    <span className="font-bold">
                      KİŞİSEL VERİ SAHİPLERİNİN AYDINLATILMASI
                    </span>
                    <br />
                    Şirketimiz, Kanun’un 10. Maddesine uygun olarak, Kişisel
                    Veri işlenmesinden önce veri sahiplerini aydınlatır. Bu
                    kapsamda Şirketimiz, kişisel verilerin elde edilmesi
                    sırasında Aydınlatma Yükümlülüğü ’nü yerine getirir.
                    Aydınlatma yükümlülüğü kapsamında ise Veri Sahiplerine
                    yapılacak bildirim şu unsurları içerir. • Veri Sorumlusunun
                    ve varsa temsilcisinin kimliği • Kişisel verilerin hangi
                    amaçla işleneceği • İşlenen kişisel verilerin kimlere ve
                    hangi amaçla aktarılabileceği • Kişisel veri toplamanın
                    yöntemi ve hukuki sebebi • Veri sahiplerinin KVKK Madde
                    11’de sayılan hakları Şirketimiz, Anayasa’nın 20. Ve KVKK’
                    nın 11. Maddesine uygun bir şekilde veri sahibinin bilgi
                    talep etmesi halinde gerekli bilgilendirmeyi yapar. <br />
                    <br />
                    <span className="font-bold">
                      KİŞİSEL VERİLERİN AKTARILMASI
                    </span>
                    <br />- Kişisel Verilerin Yurt içinde Aktarılması Kanun’un
                    8. maddesi uyarınca Kişisel Veriler kural olarak, Veri
                    Sahibinin açık rızası olmaksızın üçüncü kişilere
                    aktarılamaz. Ancak işbu Politika’ nın 4. maddesinde sayılan,
                    Veri Sahibinin açık rızası aranmayacak hallerden birinin
                    mevcut olması halinde Kişisel Verilerin, Veri Sahibinin açık
                    rızası olmaksızın yurt içinde üçüncü kişilere aktarımı
                    mümkündür. Özel Nitelikli Kişisel Veriler bakımından ise
                    yeterli önlemler alınmak kaydıyla Kanun’un 6. Maddesinin 3.
                    Fıkrasında belirtilen şartlardan birinin mevcudiyeti halinde
                    veri sahibinin açık rızası aranmaksızın veri aktarımı
                    yapılması mümkündür. -Kişisel Verilerin Yurt Dışına
                    Aktarılması Kanun’un 9. maddesi uyarınca Kişisel Veriler
                    kural olarak, Veri Sahibinin açık rızası olmaksızın yurt
                    dışına aktarılamaz. Ancak aşağıda belirtilen hallerden
                    birinin mevcut olması durumunda Kişisel Verilerin, Veri
                    Sahibinin açık rızası aranmaksızın yurt dışında üçüncü
                    kişilere aktarımı mümkündür: • Bu Politika’ nın 2. ve 3.
                    maddelerinde belirtilen, Veri Sahibi’ nin rızasının
                    aranmayacağının belirtildiği hallerden birinin mevcut olması
                    • Kişisel Verilerin aktarılacağı yabancı ülkede yeterli
                    korumanın bulunması • Yeterli korumanın bulunmaması
                    durumunda Türkiye’deki ve ilgili yabancı ülkedeki veri
                    sorumlularının yeterli bir korumayı yazılı olarak taahhüt
                    etmeleri ve Kurulun izninin bulunması Yeterli korumanın
                    bulunduğu ülkeler Kurulca belirlenerek ilan edilir. Kişisel
                    Veriler, uluslararası sözleşme hükümleri saklı kalmak üzere,
                    Türkiye’nin veya Veri Sahibinin menfaatinin ciddi bir
                    şekilde zarar göreceği durumlarda, ancak ilgili kamu kurum
                    veya kuruluşunun görüşü alınarak Kurulun izniyle yurt dışına
                    aktarılabilir. - Kişisel Verilerin Aktarılabileceği Üçüncü
                    Kişiler Şirketimiz, Kişisel Verileri bu Politika’ da
                    belirtilen amaçlarını gerçekleştirmek için, Kanun’un 8. ve
                    9. maddelerine uygun olarak, yurt içinde veya yurtdışındaki,
                    gerçek veya tüzel kişi olabilecek, belirtilen üçüncü
                    kişilere aktarabilmektedir: tedarikçiler, danışmanlar, mali
                    müşavir, avukatlar, denetim firmaları, hizmet alınan
                    firmalar, işbirliği yapılan firmalar, bayiler, bankalar,
                    yetkili kamu kurum ve kuruluşları. <br />
                    <br />
                    <span className="font-bold">
                      KİŞİSEL VERİLERİN İŞLENME AMAÇLARI
                    </span>
                    <br />
                    Kişisel verileriniz KVKK’ da öngörülen sınırlara riayet
                    edilerek Şirket mevzuatında gösterilen amaçları
                    gerçekleştirmek için kullanılacaktır. İşleme amaçlar
                    şunlardır; acil durum yönetimi süreçlerinin yürütülmesi,
                    bilgi güvenliği süreçlerinin yürütülmesi, çalışan adayı /
                    stajyer / öğrenci seçme ve yerleştirme süreçlerinin
                    yürütülmesi, çalışan adaylarının başvuru süreçlerinin
                    yürütülmesi, çalışan memnuniyeti ve bağlılığı süreçlerinin
                    yürütülmesi, çalışanlar için iş akdi ve mevzuattan kaynaklı
                    yükümlülüklerin yerine getirilmesi, çalışanlar için yan
                    haklar ve menfaatleri süreçlerinin yürütülmesi denetim /
                    etik faaliyetlerinin yürütülmesi, araç sorgulama
                    süreçlerinin yürütülmesi, bayi açılış süreçlerinin
                    yürütülmesi, randevu oluşturma süreçlerinin yürütülmesi,
                    eğitim faaliyetlerinin yürütülmesi, erişim yetkilerinin
                    yürütülmesi, faaliyetlerin mevzuata uygun yürütülmesi,
                    finans ve muhasebe işlerinin yürütülmesi, firma / ürün /
                    hizmetlere bağlılık süreçlerinin yürütülmesi, fiziksel mekan
                    güvenliğinin temini, görevlendirme süreçlerinin yürütülmesi,
                    hukuk işlerinin takibi ve yürütülmesi, iç denetim/
                    soruşturma / istihbarat faaliyetlerinin yürütülmesi,
                    iletişim faaliyetlerinin yürütülmesi, insan kaynakları
                    süreçlerinin planlanması, iş faaliyetlerinin yürütülmesi /
                    denetimi, iş sağlığı / güvenliği faaliyetlerinin
                    yürütülmesi, iş süreçlerinin iyileştirilmesine yönelik
                    önerilerin alınması ve değerlendirilmesi, iş sürekliliğinin
                    sağlanması faaliyetlerinin yürütülmesi, mal / hizmet satın
                    alım süreçlerinin yürütülmesi, mal / hizmet satış sonrası
                    destek hizmetlerinin yürütülmesi, mal / hizmet satış
                    süreçlerinin yürütülmesi, mal / hizmet üretim ve operasyon
                    süreçlerinin yürütülmesi, müşteri ilişkileri yönetimi
                    süreçlerinin yürütülmesi, müşteri memnuniyetine yönelik
                    aktivitelerin yürütülmesi, organizasyon ve etkinlik
                    yönetimi, pazarlama analiz çalışmalarının yürütülmesi,
                    performans değerlendirme süreçlerinin yürütülmesi, reklam /
                    kampanya / promosyon süreçlerinin yürütülmesi, risk yönetimi
                    süreçlerinin yürütülmesi, saklama ve arşiv faaliyetlerinin
                    yürütülmesi, sözleşme süreçlerinin yürütülmesi, talep /
                    şikayetlerin takibi, taşınır mal ve kaynakların güvenliğinin
                    temini, tedarik zinciri yönetimi süreçlerinin yürütülmesi,
                    ücret politikasının yürütülmesi, ürün / hizmetlerin
                    pazarlama süreçlerinin yürütülmesi, veri sorumlusu
                    operasyonlarının güvenliğinin temini, yatırım süreçlerinin
                    yürütülmesi, yetenek / kariyer gelişimi faaliyetlerinin
                    yürütülmesi, yetkili kişi, kurum ve kuruluşlara bilgi
                    verilmesi, yönetim faaliyetlerinin yürütülmesi. <br />
                    <br />
                    <span className="font-bold">
                      KİŞİSEL VERİLERİN TOPLANMA YÖNTEMİ
                    </span>
                    <br />
                    Kişisel veriler web sitesi, uygulamalar, e posta, işe alım
                    portalları dahil üçüncü şahıslara ait dijital mecralar veya
                    Pengona Yazılım web sitesi veya bayi paneli üzerinden,
                    sözleşmeler, başvurular, formlar, çağrı merkezi, satış ve
                    pazarlama birimi, telefon gibi vasıtalar aracılığı ile
                    ilgili kişi ile yüz yüze yapılan görüşmeler aracılığı ile
                    internet üzerinden randevu kayıtları ile açılış ve
                    organizasyonlarda yapılan görüntü kayıtları ile, güvenlik
                    kamera kayıtları ile otomatik yada otomatik olmayan yollarla
                    toplanabilmektedir. KİŞİSEL VERİ TOPLAMANIN HUKUKİ SEBEBİ
                    KVKK, kişisel verilerin işlenme şartlarını 5. maddesinin 2.
                    fıkrasında listelemektedir. Eğer bir veri sorumlusu
                    tarafından kişisel verilerin işlenme amaçları, KVKK’ da
                    listelenmiş olan kişisel veri işleme şartları çerçevesinde
                    değerlendirilebiliyorsa, o veri sorumlusu kişisel verileri
                    hukuka uygun olarak işleyebilmektedir. Bu kapsamda Şirket
                    tarafından da güdülmekte olan kişisel veri işleme
                    amaçlarının, KVKK’ da düzenlenen kişisel veri işleme
                    şartları kapsamında değerlendirilebildiği durumlarda Şirket
                    tarafından kişisel veri işleme faaliyetleri
                    gerçekleştirilmektedir. Şirket kişisel veri işleme şartları
                    kapsamına girmeyen herhangi bir kişisel veri işleme
                    faaliyetinde bulunmamaktadır. KVKK’da yer alan kişisel veri
                    işleme şartları şunlardır; • İlgili kişinin açık rızasının
                    bulunması, • Kanunlarda açıkça öngörülmesi, • Fiili
                    imkânsızlık nedeniyle rızasını açıklayamayacak durumda
                    bulunan veya rızasına hukuki geçerlilik tanınmayan kişinin
                    kendisinin ya da bir başkasının hayatı veya beden
                    bütünlüğünün korunması için zorunlu olması, • Bir
                    sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili
                    olması kaydıyla sözleşmenin taraflarına ait kişisel
                    verilerin işlenmesinin gerekli olması, • Veri sorumlusunun
                    hukuki yükümlülüğünü yerine getirebilmesi için zorunlu
                    olması, • Veri sahibinin kendisi tarafından alenileştirilmiş
                    olması, • Bir hakkın tesisi, kullanılması veya korunması
                    için veri işlemenin zorunlu olması, • Veri sahibinin temel
                    hak ve özgürlüklerine zarar vermemek kaydıyla, veri
                    sorumlusunun meşru menfaatleri için veri işlenmesinin
                    zorunlu olması. Özel nitelikli kişisel veriler için de temel
                    işleme şartı açık rızadır ve Şirket temelde özel nitelikli
                    kişisel veri işleme amacı gütmemektedir. Ancak faaliyetimiz
                    gereği işlememiz gereken veya açık rızanız ile onay
                    verdiğiniz özel nitelikli kişisel verileriniz de mevzuat
                    dahilinde ölçülü olarak işlenmektedir. KVKK’da özel
                    nitelikli kişisel verilerin işlenebilmesi için sayılan
                    şartlar şunlardır; • İlgili kişinin açık rızasının
                    bulunması, • Sağlık ve cinsel hayat dışındaki özel nitelikli
                    kişisel veriler için kanunlarda açıkça öngörülmesi, • Sağlık
                    ve cinsel hayata ilişkin kişisel veriler ise ancak; kamu
                    sağlığının korunması, koruyucu hekimlik, tıbbî teşhis,
                    tedavi ve bakım hizmetlerinin yürütülmesi, sağlık hizmetleri
                    ile finansmanının planlanması ve yönetimi amacıyla, sır
                    saklama yükümlülüğü altında bulunan kişiler veya yetkili
                    kurum ve kuruluşlar tarafından ilgilinin açık rızası
                    aranmaksızın işlenebilir. Bir kişisel veri işleme
                    faaliyetini hukuka uygun kılan bir veya birden fazla kişisel
                    veri işleme şartı aynı anda bulunabilmektedir. Söz konusu
                    amaçlarımızı gerçekleştirebilmek için yukarıda belirttiğimiz
                    verilerinizin işlenmesi gereği hasıl olmaktadır.
                    Şirketimize, kimlik bilgileri aktarılırken aslında işleme
                    amaçlarımız dahilinde olmayan veriler de tarafımıza
                    aktarılabilmektedir. İdari ve teknik tedbirler dahilinde söz
                    konusu verileri mevzuatta öngörülen süreler sonunda siliyor
                    ve/veya anonim hale getiriyoruz ancak her koşulda bu durumu
                    temin etmek mümkün olmamaktadır. Bu halde, söz konusu
                    verilerin işlenmesi amacıyla açık rızanıza başvurmak
                    gerekmektedir. <br />
                    <br />
                    <span className="font-bold">POLİTİKA’NIN GÜNCELLENME PERİYODU</span>
                    <br />
                    Politika, ihtiyaç duyuldukça gözden geçirilir ve gerekli
                    olan bölümler güncellenir. <br />
                    <br />
                    <span className="font-bold">
                      POLİTİKANIN YÜRÜRLÜĞÜ VE YÜRÜRLÜKTEN KALDIRILMASI
                    </span>
                    <br />
                    <br />
                    Politika, Şirket’in internet sitesinde yayınlanmasının
                    ardından yürürlüğe girmiş kabul edilir. Yürürlükten
                    kaldırılmasına karar verilmesi halinde, Politika’nın ıslak
                    imzalı eski nüshaları KVK ekip lideri tarafından iptal
                    edilerek (iptal yazılarak) imzalanır ve en az 5 yıl süre ile
                    KVKK klasöründe saklanır.
                  </p>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </div>
    </div>
  );
}
