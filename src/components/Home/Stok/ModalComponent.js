import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Button, Input } from "antd";
import { TextareaAutosize } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsProcess, updateProductProcess } from "../../../api";
import delete2 from "../../../../public/images/delete.png";

import { resetAllProducts } from "../../../redux/slice/get-all-products-slice";
import Image from "next/image";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import Resizer from "react-image-file-resizer";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "#000E36",
  border: "2px solid #FFF",
  boxShadow: 24,
  p: 2,
};

const ModalComponent = ({
  open,
  handleClose,
  ProductDetail,
  detailOrUpdate,
}) => {
  const [urunAdi, setUrunAdi] = useState("");
  const [sk, setSK] = useState("");
  const [fiyat, setFiyat] = useState();
  const [barkod, setBarkod] = useState("");
  const [aciklama, setAciklama] = useState("");
  const [adres, setAdres] = useState("");
  const [paket, setPaket] = useState("");
  const [adet, setAdet] = useState("");
  const [category, setCategory] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState(
    category?.categoryName
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState(category?._id);

  useEffect(() => {
    const categoryName =
      category && category.categoryName
        ? category.categoryName
        : "Kategori Seç";
    const categoryId = category && category._id ? category._id : "Kategori Seç";
    setSelectedCategoryName(categoryName);
    setSelectedCategoryId(categoryId);
  }, [category]);

  const dispatch = useDispatch();

  const handleProductImageChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];

      const maxWidth = 800;
      const maxHeight = 800;
      const quality = 50;

      Resizer.imageFileResizer(
        file,
        maxWidth,
        maxHeight,
        "JPEG",
        quality,
        0,
        (uri) => {
          // uri is the resized and compressed image data URL
          setProductImage(uri);
        },
        "base64"
      );
    } else {
      console.log("No image selected");
      setProductImage(null);
    }
  };

  const { data: getAllCategoriesData } = useSelector(
    (state) => state.getAllCategories
  );
  useEffect(() => {
    if (ProductDetail) {
      setUrunAdi(ProductDetail.productName);
      setSK(ProductDetail.productCode);
      setFiyat(ProductDetail.productListPrice);
      setBarkod(ProductDetail.productBarcode);
      setAciklama(ProductDetail.productDescription);
      setAdres(ProductDetail.productAddress);
      setPaket(ProductDetail.productPackageType);
      setAdet(ProductDetail.productQuantity);
      setProductImage(ProductDetail.productImage);
      setCategory(ProductDetail.category);
    }
  }, [ProductDetail]);

  const handleUpdateProduct = (_id) => {
    dispatch(
      updateProductProcess({
        _id,
        productCode: sk,
        productName: urunAdi,
        productListPrice: fiyat,
        productDescription: aciklama,
        productPackageType: paket,
        productBarcode: barkod,
        productAddress: adres,
        productQuantity: adet,
        productImage: productImage,
        category: selectedCategoryId,
      })
    )
      .then(() => {
        dispatch(getAllProductsProcess());
      })
      .catch((error) => {
        console.error("Ürün güncelleme hatası:", error);
      });
  };

  const updateProduct = () => {
    handleUpdateProduct(ProductDetail?._id);
    handleClose();
  };

  const handleDelete = () => {
    setProductImage("");
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategoryId(categoryId);
    const selectedCategoryName = getAllCategoriesData.find(
      (cat) => cat._id === categoryId
    );
    setSelectedCategoryName(selectedCategoryName.categoryName);
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
          <Box sx={style} className="rounded-lg  text-white md:pt-4 pt-2 ">
            <h2 className="font-bold text-center text-xl">Ürün Detayı</h2>

            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="md:mb-1  gap-2 md:text-2xl text-lg md:font-bold font-semibold text-center flex w-full"
            >
              {productImage ? (
                <div className="mx-auto w-full">
                  <div>
                    <img
                      src={productImage}
                      alt="Ürün Resmi"
                      style={{ maxWidth: "150px", maxHeight: "110px" }}
                      className=" flex md:hidden mx-auto md:my-3 my-1"
                    />
                    <img
                      src={productImage}
                      alt="Ürün Resmi"
                      style={{ maxWidth: "150px", maxHeight: "150px" }}
                      className="mx-auto md:flex hidden md:my-3 my-1"
                    />
                  </div>
                  {detailOrUpdate ? (
                    <div className="flex w-full mx-auto mb-1">
                      <div className="mx-auto flex w-full justify-center items-center gap-2">
                        <Input
                          accept="image/*"
                          type="file"
                          onChange={handleProductImageChange}
                          className="w-3/5 h-9 "
                        />
                        <div
                          onClick={handleDelete}
                          className="cursor-pointer flex flex-col my-auto"
                        >
                          <Image src={delete2} className="mx-auto" width={20} />
                          <p className="mx-auto md:text-sm text-xs">
                            Resim Sil
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : detailOrUpdate ? (
                <Input
                  accept="image/*"
                  type="file"
                  onChange={handleProductImageChange}
                  className="w-3/5 mx-auto"
                />
              ) : null}
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="md:mb-1  gap-2 text-2xl font-bold text-center flex w-full"
            >
              <label className="md:text-lg text-sm font-bold text-center w-2/5  flex justify-end  items-center ">
                Ürün İsmi :
              </label>
              {detailOrUpdate ? (
                <Input
                  value={urunAdi}
                  onChange={(e) => setUrunAdi(e.target.value)}
                  className="md:w-3/5 my-1.5"
                />
              ) : (
                <Input
                  value={urunAdi}
                  className="md:w-3/5 md:my-1.5 "
                  readOnly
                />
              )}
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="md:mb-1  gap-2 text-2xl font-bold text-center flex w-full"
            >
              <label className="md:text-lg text-sm font-bold text-center w-2/5  flex justify-end  items-center ">
                Ürün Kodu :
              </label>
              {detailOrUpdate ? (
                <Input
                  value={sk}
                  className="md:w-3/5 md:my-1.5 my-0.5"
                  onChange={(e) => setSK(e.target.value)}
                />
              ) : (
                <Input
                  value={sk}
                  readOnly
                  className="md:w-3/5 md:my-1.5 my-0.5 "
                />
              )}
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="md:mb-1  gap-2 text-2xl font-bold text-center flex w-full"
            >
              <label className="md:text-lg text-sm font-bold text-center w-2/5  flex justify-end  items-center ">
                Ürün Adeti :
              </label>
              <Input value={adet} className="md:w-3/5 my-1.5" readOnly />
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="md:mb-1  gap-2 text-2xl font-bold text-center flex w-full"
            >
              <label className="md:text-lg text-sm font-bold text-center w-2/5  flex justify-end  items-center ">
                Liste Fiyatı :
              </label>
              {detailOrUpdate ? (
                <Input
                  value={fiyat}
                  className="md:w-3/5 my-1.5"
                  onChange={(e) => setFiyat(e.target.value)}
                />
              ) : (
                <Input value={fiyat} className="md:w-3/5 my-1.5" readOnly />
              )}
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="md:mb-1  gap-2 text-2xl font-bold text-center flex w-full"
            >
              <label className="md:text-lg text-sm font-bold text-center w-2/5  flex justify-end  items-center ">
                Birim Türü :
              </label>
              {detailOrUpdate ? (
                <Input
                  value={paket}
                  className="md:w-3/5 my-1.5"
                  onChange={(e) => setPaket(e.target.value)}
                />
              ) : (
                <Input value={paket} className="md:w-3/5 my-1.5" readOnly />
              )}
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="md:mb-1  gap-2 text-2xl font-bold text-center flex w-full"
            >
              <label className="md:text-lg text-sm font-bold text-center w-2/5  flex justify-end  items-center ">
                Barkod No :
              </label>
              {detailOrUpdate ? (
                <Input
                  value={barkod}
                  className="md:w-3/5 my-1.5"
                  onChange={(e) => setBarkod(e.target.value)}
                />
              ) : (
                <Input value={barkod} className="md:w-3/5 my-1.5" readOnly />
              )}
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="md:mb-1  gap-2 text-2xl font-bold text-center flex w-full"
            >
              <label className="md:text-lg text-sm font-bold text-center w-2/5  flex justify-end  items-center ">
                Raf Adresi :
              </label>
              {detailOrUpdate ? (
                <Input
                  value={adres}
                  className="md:w-3/5 my-1.5"
                  onChange={(e) => setAdres(e.target.value)}
                />
              ) : (
                <Input value={adres} className="md:w-3/5 my-1.5" readOnly />
              )}
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="md:mb-1  gap-2 text-sm font-bold text-center flex w-full"
            >
              <p className="md:text-lg text-sm font-bold text-center w-2/5  flex justify-end  items-center">
                Kategori :
              </p>
              <div className="w-full md:w-3/5">
                {detailOrUpdate ? (
                  <Listbox value={category} onChange={handleCategoryChange}>
                    <div className="relative mt-1 w-full">
                      <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate text-black">
                          {selectedCategoryName}
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
                          {getAllCategoriesData &&
                            getAllCategoriesData.map((option, optionIdx) => (
                              <Listbox.Option
                                key={optionIdx}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active
                                      ? "bg-amber-100 text-amber-900"
                                      : "text-gray-900"
                                  }`
                                }
                                value={option._id}
                              >
                                {({ selected }) => (
                                  <div className="flex items-center justify-between">
                                    <div
                                      className={`truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      {option.categoryName}
                                    </div>
                                    {selected && (
                                      <CheckIcon
                                        className="h-5 w-5 text-amber-600"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </div>
                                )}
                              </Listbox.Option>
                            ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                ) : (
                  <Input
                    value={selectedCategoryName}
                    className="w-full "
                    readOnly
                  />
                )}
              </div>
            </Typography>
            <Typography
              id="transition-modal-description"
              className="md:mb-1  gap-2 text-2xl font-bold text-center flex w-full"
            >
              <label className="md:text-lg text-sm font-bold text-center w-2/5 md:w-3/5  flex justify-end  items-center ">
                Açıklama :
              </label>
              {detailOrUpdate ? (
                <div className="w-full">
                  <TextareaAutosize
                    value={aciklama}
                    minRows={2}
                    maxRows={3}
                    className="flex md:hidden md:w-3/5 w-full my-1.5 text-black text-sm bg-blue-gray-100"
                    onChange={(e) => setAciklama(e.target.value)}
                  />
                  <TextareaAutosize
                    value={aciklama}
                    minRows={2}
                    maxRows={3}
                    className=" md:flex hidden w-full  my-1.5 text-black text-sm bg-blue-gray-100"
                    onChange={(e) => setAciklama(e.target.value)}
                  />
                </div>
              ) : (
                <div className="w-full h-10">
                  <TextareaAutosize
                    value={aciklama}
                    minRows={2}
                    maxRows={3}
                    className=" flex md:hidden w-full my-1.5 text-black text-sm bg-blue-gray-100"
                    readOnly
                  />
                  <TextareaAutosize
                    value={aciklama}
                    minRows={2}
                    maxRows={3}
                    className="w-full my-1.5 text-black text-sm md:flex hidden bg-blue-gray-100"
                    readOnly
                  />
                </div>
              )}
            </Typography>
            <div className="w-full flex justify-end md:mt-4 mt-2">
              {detailOrUpdate ? (
                <div className="w-full flex justify-end gap-6">
                  <button
                    className="font-bold px-4 bg-blue-500 py-2 rounded-lg hover:bg-blue-700 duration-200"
                    onClick={updateProduct}
                    type="primary"
                  >
                    Kaydet
                  </button>
                  <button
                    className="font-bold px-4 bg-red-500 py-2 rounded-lg hover:bg-red-700 duration-200"
                    onClick={handleClose}
                    type="primary"
                  >
                    Kapat
                  </button>
                </div>
              ) : (
                <button
                  className="font-bold px-4 bg-red-500 py-2 rounded-lg hover:bg-red-700 duration-200"
                  onClick={handleClose}
                  type="primary"
                >
                  Kapat
                </button>
              )}
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalComponent;
