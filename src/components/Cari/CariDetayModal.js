import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Button, Input } from "antd";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  InputBase,
  TextareaAutosize,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllOrdersProcess, updateOrderProcess } from "@/src/api";
import { useRouter } from "next/router";
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
  p: 1,
};

function encryptData(data) {
  const encryptedData = btoa(data);
  return encryptedData;
}

const CariDetayModal = ({ open, handleClose, OrderDetail, detailOrUpdate }) => {
  const [modalTcNumber, setModalTcNumber] = useState("");
  const [modalIsim, setModalIsim] = useState("");
  const [modalEmail, setModalEmail] = useState("");
  const [modalTelefon, setModalTelefon] = useState("");
  const [modalAdres, setModalAdres] = useState("");
  const [modalOzellik, setModalOzellik] = useState("");
  const [isSelected1, setSelection1] = useState(false);
  const [isSelected2, setSelection2] = useState(false);
  const [il, setIl] = useState("");
  const [ilce, setIlce] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (open && OrderDetail) {
      setModalTcNumber(OrderDetail.tcNumber);
      setModalIsim(OrderDetail.isim);
      setModalEmail(OrderDetail.email);
      setModalTelefon(OrderDetail.telefon);
      setModalAdres(OrderDetail.adres);
      setModalOzellik(OrderDetail.ozellik);
      setIl(OrderDetail?.il);
      setIlce(OrderDetail?.ilce);

      if (OrderDetail.ozellik.includes("Tedarikçi")) {
        setSelection1(true);
      } else {
        setSelection1(false);
      }
      if (OrderDetail.ozellik.includes("Müşteri")) {
        setSelection2(true);
      } else {
        setSelection2(false);
      }
    }
  }, [open, OrderDetail]);
  const cities = [
    "Adana",
    "Adıyaman",
    "Afyonkarahisar",
    "Ağrı",
    "Amasya",
    "Ankara",
    "Antalya",
    "Artvin",
    "Aydın",
    "Balıkesir",
    "Bilecik",
    "Bingöl",
    "Bitlis",
    "Bolu",
    "Burdur",
    "Bursa",
    "Çanakkale",
    "Çankırı",
    "Çorum",
    "Denizli",
    "Diyarbakir",
    "Edirne",
    "Elazığ",
    "Erzincan",
    "Erzurum",
    "Eskişehir",
    "Gaziantep",
    "Giresun",
    "Gümüşhane",
    "Hakkari",
    "Hatay",
    "Isparta",
    "Mersin",
    "İstanbul",
    "İzmir",
    "Kars",
    "Kastamonu",
    "Kayseri",
    "Kırklareli",
    "Kırşehir",
    "Kocaeli",
    "Konya",
    "Kütahya",
    "Malatya",
    "Manisa",
    "Kahramanmaraş",
    "Mardin",
    "Muğla",
    "Muş",
    "Nevşehir",
    "Niğde",
    "Ordu",
    "Rize",
    "Sakarya",
    "Samsun",
    "Siirt",
    "Sinop",
    "Sivas",
    "Tekirdağ",
    "Tokat",
    "Trabzon",
    "Tunceli",
    "Şanlıurfa",
    "Uşak",
    "Van",
    "Yozgat",
    "Zonguldak",
    "Aksaray",
    "Bayburt",
    "Karaman",
    "Kırıkkale",
    "Batman",
    "Şırnak",
    "Bartın",
    "Ardahan",
    "Iğdır",
    "Yalova",
    "Karabük",
    "Kilis",
    "Osmaniye",
    "Düzce",
  ];

  const handleCityChange = (city) => {
    setIl(city);
  };

  const handleUpdateOrder = (_id) => {
    dispatch(
      updateOrderProcess({
        _id,
        tcNumber: modalTcNumber,
        isim: modalIsim,
        email: modalEmail,
        telefon: modalTelefon,
        adres: modalAdres,
        il: il,
        ilce: ilce,
      })
    )
      .then(() => {
        dispatch(getAllOrdersProcess());
      })
      .catch((error) => {
        console.log("Cari güncelleme hatası:", error);
      });
  };

  const updateOrder = () => {
    handleUpdateOrder(OrderDetail?._id);
    handleClose();
  };

  const handlePastTransactions = () => {
    const encryptedPageStok = encryptData(3);
    const encryptedDocumentId = encryptData(OrderDetail?._id);

    router.push({
      pathname: "/stokTakip/belgeler",
      query: { a1: encryptedPageStok, a2: encryptedDocumentId },
    });
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        className="rounded-lg"
      >
        <Fade in={open}>
          <Box sx={style} className="rounded-lg g text-white pt-4 mx-auto">
            <h2 className="text-center text-xl mb-2 font-bold">Cari Detayı</h2>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="pb-3 gap-2 text-2xl font-bold text-center flex w-full"
            >
              <label className="text-lg font-bold text-center w-2/5 flex justify-end">
                Tc No :
              </label>
              {detailOrUpdate ? (
                <Input
                  value={modalTcNumber}
                  onChange={(e) => setModalTcNumber(e.target.value)}
                  className="w-3/5"
                  maxLength={11}
                />
              ) : (
                <Input value={modalTcNumber} className="w-3/5" readOnly />
              )}
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="pb-3 gap-2 text-2xl font-bold text-center flex w-full"
            >
              <label className="text-lg font-bold text-center w-2/5 flex justify-end">
                Cari İsmi :
              </label>
              {detailOrUpdate ? (
                <Input
                  value={modalIsim}
                  className="w-3/5"
                  onChange={(e) => setModalIsim(e.target.value)}
                />
              ) : (
                <Input value={modalIsim} className="w-3/5" readOnly />
              )}
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="pb-3 gap-2 text-2xl font-bold text-center flex w-full"
            >
              <label className="text-lg font-bold text-center w-2/5 flex justify-end">
                Email :
              </label>
              {detailOrUpdate ? (
                <Input
                  value={modalEmail}
                  className="w-3/5"
                  onChange={(e) => setModalEmail(e.target.value)}
                />
              ) : (
                <Input value={modalEmail} className="w-3/5" readOnly />
              )}
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="pb-3 gap-2 text-2xl font-bold text-center flex w-full"
            >
              <label className="text-lg font-bold text-center w-2/5 flex justify-end">
                Telefon :
              </label>
              {detailOrUpdate ? (
                <Input
                  value={modalTelefon}
                  className="w-3/5"
                  onChange={(e) => setModalTelefon(e.target.value)}
                />
              ) : (
                <Input value={modalTelefon} className="w-3/5" readOnly />
              )}
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="pb-3 gap-2 text-2xl font-bold text-center flex w-full"
            >
              <label className="text-lg font-bold text-center w-2/5 flex justify-end items-center">
                İl :
              </label>
              {detailOrUpdate ? (
                <div className="w-3/5 z-10">
                  <Listbox value={il} onChange={handleCityChange}>
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate text-black text-sm">
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
              ) : (
                <Input value={il} className="w-3/5" readOnly />
              )}
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="pb-3 gap-2 text-2xl font-bold text-center flex w-full"
            >
              <label className="text-lg font-bold text-center w-2/5 flex justify-end">
                İlçe :
              </label>
              {detailOrUpdate ? (
                <Input
                  value={ilce}
                  className="w-3/5"
                  onChange={(e) => setIlce(e.target.value)}
                />
              ) : (
                <Input value={modalAdres} className="w-3/5" readOnly />
              )}
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="pb-3 gap-2 text-2xl font-bold text-center flex w-full"
            >
              <label className="text-lg font-bold text-center w-2/5 flex justify-end">
                Adres :
              </label>
              {detailOrUpdate ? (
                <Input
                  value={modalAdres}
                  className="w-3/5"
                  onChange={(e) => setModalAdres(e.target.value)}
                />
              ) : (
                <Input value={modalAdres} className="w-3/5" readOnly />
              )}
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="pb-3 gap-2 text-2xl font-bold text-center text-white flex w-full"
            >
              <label className="text-lg font-bold text-center w-2/5 flex justify-end">
                Özellik :
              </label>

              <FormGroup className="grid grid-cols-2 pl-3 gap-2 text-white">
                <FormControlLabel
                  control={<Checkbox checked={isSelected1} readOnly />}
                  label="Tedarikçi"
                  value="Tedarikçi"
                />
                <FormControlLabel
                  control={<Checkbox checked={isSelected2} readOnly />}
                  label="Müşteri"
                  value="Müşteri"
                />
              </FormGroup>
            </Typography>

            <div className="w-full flex justify-between mt-3 gap-0 ">
              <button
                // type="primary"
                className="bg-green-600 text-white py-2 font-bold px-1 hover:bg-green-300 mx-auto hover:text-white  rounded-lg duration-200"
                onClick={handlePastTransactions}
              >
                Geçmiş işlemler
              </button>
             

              {detailOrUpdate ? (
                <button
                  type="primary"
                  className="font-bold px-3 bg-blue-500 py-2 rounded-lg hover:bg-blue-700 duration-200"
                  onClick={updateOrder}
                >
                  Kaydet
                </button>
                
              ) : null}
               <button
                type="primary"
                className="bg-red-700 flex px-6 ml-4  font-bold py-2 rounded-md"
                onClick={handleClose}
              >
                Kapat
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default CariDetayModal;
