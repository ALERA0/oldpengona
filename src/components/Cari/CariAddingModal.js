import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Button, Checkbox, Form, Input } from "antd";
import { FormControlLabel, FormGroup } from "@mui/material";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "#000E36",
  border: "2px solid #FFF",
  boxShadow: 24,
  p: 4,
};

const CariAddingModal = ({
  openAddingModal,
  handleCloseAddingModal,
  addNewOrder,
  onFinishFailed,
  tcNumber,
  isim,
  email,
  telefon,
  adres,
  ozellik,
  handleIsimChange,
  handleTcNumberChange,
  handleEmailChange,
  handleTelefonChange,
  handleAdresChange,
  handleIlChange,
  handleIlceChange,
  il,
  ilce,
  handleOzellikChange,
  isSelected1,
  setSelection1,
  isSelected2,
  setSelection2,
  handleCityChange
}) => {
  const cities = [
    'Adana',
    'Adıyaman',
    'Afyonkarahisar',
    'Ağrı',
    'Amasya',
    'Ankara',
    'Antalya',
    'Artvin',
    'Aydın',
    'Balıkesir',
    'Bilecik',
    'Bingöl',
    'Bitlis',
    'Bolu',
    'Burdur',
    'Bursa',
    'Çanakkale',
    'Çankırı',
    'Çorum',
    'Denizli',
    'Diyarbakir',
    'Edirne',
    'Elazığ',
    'Erzincan',
    'Erzurum',
    'Eskişehir',
    'Gaziantep',
    'Giresun',
    'Gümüşhane',
    'Hakkari',
    'Hatay',
    'Isparta',
    'Mersin',
    'İstanbul',
    'İzmir',
    'Kars',
    'Kastamonu',
    'Kayseri',
    'Kırklareli',
    'Kırşehir',
    'Kocaeli',
    'Konya',
    'Kütahya',
    'Malatya',
    'Manisa',
    'Kahramanmaraş',
    'Mardin',
    'Muğla',
    'Muş',
    'Nevşehir',
    'Niğde',
    'Ordu',
    'Rize',
    'Sakarya',
    'Samsun',
    'Siirt',
    'Sinop',
    'Sivas',
    'Tekirdağ',
    'Tokat',
    'Trabzon',
    'Tunceli',
    'Şanlıurfa',
    'Uşak',
    'Van',
    'Yozgat',
    'Zonguldak',
    'Aksaray',
    'Bayburt',
    'Karaman',
    'Kırıkkale',
    'Batman',
    'Şırnak',
    'Bartın',
    'Ardahan',
    'Iğdır',
    'Yalova',
    'Karabük',
    'Kilis',
    'Osmaniye',
    'Düzce',
];






  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openAddingModal}
        onClose={handleCloseAddingModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        className="rounded-lg"
      >
        <Fade in={openAddingModal}>
          <Box sx={style} className="rounded-lg  pt-6 text-white ">
            <h2 className="text-2xl font-bold text-center mb-2">
              Yeni Cari Ekle
            </h2>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={addNewOrder}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              className=" gap-2 text-2xl font-bold text-center w-full "
            >
              <Form.Item
                name="tcNumber"
                rules={[{ required: true, message: "Tc No boş bırakılamaz!" }]}
                className="w-full mx-auto"
              >
                <div className="flex w-full gap-2 md:grid md:grid-cols-8 md:w-80">
                  <p className="text-white text-base font-bold text-center flex justify-center items-center md:col-span-2 w-1/3 md:w-auto">
                    Tc No<span className="text-red-500 ml-1 text-lg">*</span>
                  </p>
                  <Input
                    value={tcNumber}
                    onChange={handleTcNumberChange}
                    className="md:col-span-5 w-full"
                    maxLength={11}
                  />
                </div>
              </Form.Item>
              <Form.Item
                // label="Ürün Adı :"
                name="isim"
                rules={[{ required: true, message: "İsim boş bırakılamaz!" }]}
                // className="w-full mx-auto"
              >
                <div className="flex w-full gap-2 md:grid md:grid-cols-8 md:w-80">
                  <p className="text-white text-sm font-bold text-center flex justify-center items-center md:col-span-2 w-1/3 md:w-auto">
                    Cari İsmi<span className="text-red-500 ml-1 text-lg">*</span>
                  </p>
                  <Input
                    value={isim}
                    onChange={handleIsimChange}
                    className="md:col-span-5 w-full"
                  />
                </div>
              </Form.Item>
              <Form.Item
                // label="Ürün Adı :"
                name="email"
                rules={[{ required: true, message: "Email boş bırakılamaz!" }]}
                // className="w-full mx-auto"
              >
                <div className="flex w-full gap-2 md:grid md:grid-cols-8 md:w-80">
                  <p className="text-white text-base font-bold text-center flex justify-center items-center md:col-span-2 w-1/3 md:w-auto">
                    Email<span className="text-red-500 ml-1 text-lg">*</span>
                  </p>
                  <Input
                    value={email}
                    onChange={handleEmailChange}
                    className="md:col-span-5 w-full"
                  />
                </div>
              </Form.Item>
              <Form.Item
                // label="Ürün Adı :"
                name="telefon"
                rules={[
                  { required: true, message: "Telefon boş bırakılamaz!" },
                ]}
                // className="w-full mx-auto"
              >
                <div className="flex w-full gap-2 md:grid md:grid-cols-8 md:w-80">
                  <p className="text-white text-base font-bold text-center flex justify-center items-center md:col-span-2 w-1/3 md:w-auto">
                    Telefon<span className="text-red-500 ml-1 text-lg">*</span>
                  </p>
                  <Input
                    value={telefon}
                    onChange={handleTelefonChange}
                    className="md:col-span-5 w-full"
                    placeholder="0555-555-55-55"
                    maxLength={11}
                  />
                </div>
              </Form.Item>
              <Form.Item
                // label="Ürün Adı :"
                name="il"
                
                // className="w-full mx-auto"
              >
                <div className="flex w-full gap-2 md:grid md:grid-cols-8 md:w-80">
                  <p className="text-white text-base font-bold text-center flex justify-center items-center md:col-span-2 w-1/3 md:w-auto">İl<span className="text-red-500 ml-1 text-lg">*</span></p>
                  <div className="col-span-5 w-full z-10">
                    <Listbox value={il} onChange={handleCityChange}>
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <span className="block truncate">
                            {il ? il : "İl Seç"}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={React.Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {cities.map((city) => (
                              <Listbox.Option key={city} value={city}>
                                {({ active, selected }) => (
                                  <div
                                    className={`${
                                      active
                                        ? "bg-amber-100 text-amber-900"
                                        : "text-gray-900"
                                    } cursor-pointer select-none relative py-2 pl-10 pr-4`}
                                  >
                                    <span
                                      className={`${
                                        selected ? "font-medium" : "font-normal"
                                      } block truncate`}
                                    >
                                      {city}
                                    </span>
                                  </div>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>
                </div>
              </Form.Item>
              <Form.Item
                // label="Ürün Adı :"
                name="ilce"

                // className="w-full mx-auto"
              >
                <div className="flex w-full gap-2 md:grid md:grid-cols-8 md:w-80">
                  <p className="text-white text-base font-bold text-center flex justify-center items-center md:col-span-2 w-1/3 md:w-auto">
                    İlce
                  </p>
                  <Input
                    value={ilce}
                    onChange={handleIlceChange}
                    className="md:col-span-5 w-full"
                  />
                </div>
              </Form.Item>
              <Form.Item
                // label="Ürün Adı :"
                name="adres"
                rules={[{ required: true, message: "Adres boş bırakılamaz!" }]}
                // className="w-full mx-auto"
              >
                <div className="flex w-full gap-2 md:grid md:grid-cols-8 md:w-80">
                  <p className="text-white text-base font-bold text-center flex justify-center items-center md:col-span-2 w-1/3 md:w-auto">
                    Adres
                  </p>
                  <Input
                    value={adres}
                    onChange={handleAdresChange}
                    className="md:col-span-5 w-full"
                  />
                </div>
              </Form.Item>
              <Form.Item
                // label="Ürün Adı :"
                name="adres"
                rules={[
                  { required: true, message: "Cari özelliği boş bırakılamaz!" },
                ]}
                // className="w-full mx-auto"
              >
                <div className="flex w-full gap-2 md:grid md:grid-cols-8 md:w-80 ">
                  <p className="text-white text-base font-bold text-center flex justify-center items-center md:col-span-2 w-1/3 md:w-auto">
                    Özellik<span className="text-red-500 ml-1 text-lg">*</span>
                  </p>
                  <FormGroup className="flex  gap-2 md:pl-3 col-span-5 text-white w-full items-center flex-row  justify-center ">
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Tedarikçi"
                      value={isSelected1}
                      onChange={setSelection1}
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Müşteri"
                      value={isSelected2}
                      onChange={setSelection2}
                    />
                  </FormGroup>
                </div>
              </Form.Item>
              <Form.Item
                // label="Ürün Adı :"
                name="action"
                className="w-full mx-auto flex items-end justify-end "
              >
                <div className="flex  w-full gap-6 text-white">
                  <button
                    type="primary"
                    className="bg-blue-700 px-3 text-sm  flex  justify-center items-center font-bold py-2 rounded-md"
                    htmlType="submit"
                  >
                    Kaydet
                  </button>
                  <button
                    type="primary"
                    className="bg-red-700 flex  px-12 font-bold py-2 rounded-md"
                    onClick={handleCloseAddingModal}
                  >
                    Kapat
                  </button>
                </div>
              </Form.Item>
            </Form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default CariAddingModal;
