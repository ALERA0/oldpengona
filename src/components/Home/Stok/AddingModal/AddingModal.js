import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Button, Checkbox, Form, Input } from "antd";
import { TextareaAutosize } from "@mui/material";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useEffect } from "react";
import { useState } from "react";

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

const AddingModal = ({
  productImageFile,
  openAddingModal,
  handleCloseAddingModal,
  addNewProduct,
  onFinishFailed,
  productName,
  productCode,
  productImage,
  productQuantity,
  productPrice,
  productPackageType,
  productBarcode,
  productAddress,
  productDescription,
  handleProductNameChange,
  handleProductCodeChange,
  handleProductQuantityChange,
  handleProductPriceChange,
  handleProductPackageTypeChange,
  handleProductBarcodeChange,
  handleProductAddressChange,
  handleProductDescriptionChange,
  handleProductImage,
  handleProductImageChange,
  getAllCategoriesData,
  category,
  setCategory,
  birim,
  handleCityChange,
}) => {
  const birimler = ["mm", "kg", "lt", "adet"];

  const [selectedCategoryName, setSelectedCategoryName] = React.useState("");
  const [selectedCategoryId, setSelectedCategoryId] = React.useState("");

  // Kategori değiştiğinde çalışacak işlev
  const handleCategoryChange = (categoryId) => {
    // Seçilen kategori "_id" değerini bul
    const selectedCategory = getAllCategoriesData.find(
      (cat) => cat._id === categoryId
    );

    // Seçilen kategori bilgilerini güncelle
    setSelectedCategoryName(selectedCategory?.categoryName || "");
    setSelectedCategoryId(categoryId);

    // Kategori değişikliğini diğer işlemlere aktar
    setCategory(categoryId);
  };
  useEffect(() => {
    // Modal kapanırken state'leri sıfırla
    setSelectedCategoryId("");
    setSelectedCategoryName("");
  }, [openAddingModal]);

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
        className="rounded-lg "
      >
        <Fade in={openAddingModal}>
          <Box sx={style} className="rounded-lg  text-white md:pt-6 ">
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 400 }}
              initialValues={{ remember: true }}
              onFinish={addNewProduct}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              className="  md:text-2xl text-lg font-semibold md:font-bold text-center w-full "
            >
              <h2 className="text-white mb-2">Yeni Ürün Oluştur</h2>
              <Form.Item
                // label="Ürün Adı :"
                name="productName"
                rules={[
                  { required: true, message: "Ürün adı boş bırakılamaz!" },
                ]}
                className="md:mb-4 mb-3"
              >
                <div className="grid grid-cols-6 w-80  gap-2 ">
                  <p className="text-white text-base font-bold text-center flex justify-center items-center col-span-2">
                    Ürün Adı<span className="text-red-500 ml-1 text-lg">*</span>
                  </p>
                  <Input
                    value={productName}
                    onChange={handleProductNameChange}
                    className="w-full col-span-4 "
                  />
                </div>
              </Form.Item>
              <Form.Item
                // label="Ürün Adı :"
                name="productCode"
                rules={[
                  { required: true, message: "Ürün Kodu boş bırakılamaz!" },
                ]}
                className="md:mb-4 mb-3"
              >
                {/* Büyük Ekran */}
                <div className="grid  grid-cols-6 w-80  gap-2  ">
                  <p className="text-white text-base font-bold text-center flex justify-center items-center col-span-2">
                    Ürün Kodu
                    <span className="text-red-500 ml-1 text-lg">*</span>
                  </p>
                  <Input
                    value={productCode}
                    onChange={handleProductCodeChange}
                    className="w-full col-span-4"
                  />
                </div>
              </Form.Item>
              <Form.Item
                // label="Ürün Adı :"
                name="productImage"
                className="md:mb-4 mb-3"
              >
                <div className="grid grid-cols-6 w-80  gap-2  ">
                  <p className="text-white text-base font-bold text-center flex justify-center items-center col-span-2">
                    Ürün Resmi
                  </p>
                  <Input
                    accept="image/*"
                    type="file"
                    onChange={handleProductImageChange}
                    className="col-span-4"
                    // maxLength={11}
                    // minLength={11}
                  />
                </div>
              </Form.Item>
              <Form.Item className="md:mb-4 mb-3 ">
                <div className="grid grid-cols-6 w-80  gap-2">
                  <p className="text-white text-base font-bold text-center flex justify-center items-center col-span-2">
                    Kategori
                  </p>
                  <div className="col-span-4 z-30">
                    <Listbox value={category} onChange={handleCategoryChange}>
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <span className="block truncate">
                            {selectedCategoryName ? (
                              selectedCategoryName
                            ) : (
                              <span className="text-gray-400">
                                Kategori Seç
                              </span>
                            )}
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
                                          selected
                                            ? "font-medium"
                                            : "font-normal"
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
                  </div>
                </div>
              </Form.Item>

              <Form.Item
                // label="Ürün Adı :"
                name="productPrice"
                className="md:mb-4 mb-3"
              >
                <div className="grid grid-cols-6 w-80  gap-2  ">
                  <p className="text-white text-base font-bold text-center flex justify-center items-center col-span-2">
                    Liste Fiyatı
                  </p>
                  <Input
                    value={productPrice}
                    onChange={handleProductPriceChange}
                    className="w-full col-span-4"
                  />
                </div>
              </Form.Item>
              <Form.Item
                // label="Ürün Adı :"
                name="birim"
                rules={[
                  { required: true, message: "Birim Türü boş bırakılamaz!" },
                ]}
              >
                <div className="grid grid-cols-6 w-80 gap-2">
                  <p className="text-white text-base font-bold text-center flex justify-center items-center col-span-2">
                    Birim Türü
                  </p>
                  <div className="col-span-4 z-10">
                    <Listbox value={birim} onChange={handleCityChange}>
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <span className="block truncate">
                            {birim ? birim : "Birim Seç"}
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
                            {birimler.map((city) => (
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
                name="productBarcode"
                className="md:mb-4 mb-3"
              >
                <div className="grid grid-cols-6 w-80  gap-2  ">
                  <p className="text-white text-base font-bold text-center flex justify-center items-center col-span-2">
                    Ürün Barkod
                  </p>
                  <Input
                    value={productBarcode}
                    onChange={handleProductBarcodeChange}
                    className="w-full col-span-4"
                  />
                </div>
              </Form.Item>
              <Form.Item
                // label="Ürün Adı :"
                name="productAddress"
                className="md:mb-4 mb-3"
              >
                <div className="grid grid-cols-6 w-80  gap-2  ">
                  <p className="text-white text-base font-bold text-center flex justify-center items-center col-span-2">
                    Raf Adresi
                  </p>
                  <Input
                    value={productAddress}
                    onChange={handleProductAddressChange}
                    className="w-full col-span-4"
                  />
                </div>
              </Form.Item>
              <Form.Item
                // label="Ürün Adı :"
                name="productDescription"

                // className="w-full mx-auto"
              >
                <div className="grid grid-cols-6 w-80  gap-2  ">
                  <p className="text-white text-base font-bold text-center flex justify-center items-center col-span-2">
                    Açıklama
                  </p>
                  <TextareaAutosize
                    minRows={3}
                    maxRows={3}
                    value={productDescription}
                    onChange={handleProductDescriptionChange}
                    className=" text-black text-sm col-span-4 rounded-lg"
                    // maxLength={11}
                    // minLength={11}
                  />
                </div>
              </Form.Item>
              <Form.Item
                // label="Ürün Adı :"
                name="action"
                className="w-full mx-auto flex items-end justify-end "
              >
                <div className="flex  w-full gap-2 ">
                  <Button
                    type="primary"
                    className="bg-blue-700 px-3 text-sm rounded-lg flex items-end justify-end "
                    htmlType="submit"
                  >
                    Kaydet
                  </Button>
                  <Button
                    type="primary"
                    className="bg-red-700 flex items-end"
                    onClick={handleCloseAddingModal}
                  >
                    Kapat
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default AddingModal;
