import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Button,  Switch, TextareaAutosize } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getIncomingProductDetailProcess,
  getOutgoingProductDetailProcess,
  getVirtualIncomingProductDetailProcess,
  getVirtualOutgoingProductDetailProcess,
  updateIncomingDocProductQuantityProcess,
  updateIncomingVirtualDocProductsProcess,
  updateOutgoingDocProductQuantityProcess,
  updateOutgoingVirtualDocProductsProcess,
} from "@/src/api";
import { resetIncomingProductDetail } from "@/src/redux/slice/get-incoming-product-detail-slice";
import { resetOutgoingProductDetail } from "@/src/redux/slice/get-outgoing-product-detail-slice";
import { useRouter } from "next/router";
import { updateProduct } from "@/src/redux/slice/local-product-slice";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { Input } from "antd";

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

const percents = [
  { percent: 20 },
  { percent: 18 },
  { percent: 10 },
  { percent: 8 },
  { percent: 1 },
];

const BelgeUrunDetayModal = ({
  open,
  handleClose,
  productData,
  isGelen,
  data,
  detailOrUpdate,
}) => {
  const dispatch = useDispatch();
  const [productCode, setProductCode] = useState("");
  const [productName, setProductName] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPurchasePrice, setProductPurchasePrice] = useState("");
  const [productSalesPrice, setProductSalesPrice] = useState("");
  const [kdvPercent, setKdvPercent] = useState();
  const [includeKdv, setIncludeKdv] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const { data: virtualDocData } = useSelector(
    (state) => state.addVirtualIncomingDoc
  );
  const { data: addVirtualOutgoingDocData } = useSelector(
    (state) => state.addVirtualOutgoingDoc
  );

  const [quantity, setQuantity] = useState("");
  const [birim, setBirim] = useState("");

  const router = useRouter();
  const { pathname } = router;

  const handleUpdateProductQuantity = async () => {
    if (pathname === "/stokTakip/belgeDetay") {
      if (isGelen) {
        const parsedkdvPercent = parseInt(kdvPercent, 10);
        await dispatch(
          updateIncomingDocProductQuantityProcess({
            incomingProductId: data._id,
            productId: productData._id,
            quantity: quantity,
            kdvPercent: parsedkdvPercent,
            includeKdv: includeKdv,
            productPurchasePrice: productPurchasePrice,
            productSelfId: productData.product._id,
          })
        );
      } else {
        const parsedkdvPercent = parseInt(kdvPercent, 10);
        await dispatch(
          updateOutgoingDocProductQuantityProcess({
            outgoingProductId: data._id,
            productId: productData._id,
            quantity: quantity,
            kdvPercent: parsedkdvPercent,
            includeKdv: includeKdv,
            productSalesPrice: productSalesPrice,
            productSelfId: productData.product._id,
          })
        );
      }

      if (isGelen) {
        await dispatch(
          getIncomingProductDetailProcess({ incomingProductId: data?._id })
        );
      } else {
        await dispatch(
          getOutgoingProductDetailProcess({ outgoingProductId: data?._id })
        );
      }
    } else {
      if (pathname === "/stokTakip/urunGiris") {
        const parsedkdvPercent = parseInt(kdvPercent, 10);

        await dispatch(
          updateIncomingVirtualDocProductsProcess({
            virtualDocId: virtualDocData._id,
            productId: productData._id,
            quantity: quantity,
            productPurchasePrice: productPurchasePrice,
            includeKdv: includeKdv,
            kdvPercent: parsedkdvPercent,
            productSelfId: productData.product._id,
          })
        );
        await dispatch(
          getVirtualIncomingProductDetailProcess({
            virtualDocId: virtualDocData?._id,
          })
        );
      } else {
        const parsedkdvPercent = parseInt(kdvPercent, 10);
        await dispatch(
          updateOutgoingVirtualDocProductsProcess({
            virtualDocId: addVirtualOutgoingDocData._id,
            productId: productData._id,
            quantity: quantity,
            productSalesPrice: productSalesPrice,
            includeKdv: includeKdv,
            kdvPercent: parsedkdvPercent,
            productSelfId: productData.product._id,
          })
        );
        await dispatch(
          getVirtualOutgoingProductDetailProcess({
            virtualDocId: addVirtualOutgoingDocData._id,
          })
        );
      }
    }
    handleClose();
  };


  useEffect(() => {
    if (productData) {
      setProductCode(productData.product?.productCode);
      setProductName(productData.product?.productName);
      setQuantity(productData.quantity.toString());
      setProductDescription(productData.product?.productDescription);
      setProductQuantity(productData?.product?.productQuantity.toString());
      setBirim(productData?.product?.productPackageType);
      if (isGelen) {
        setProductPurchasePrice(productData?.productPurchasePrice.toString());
      } else {
        setProductSalesPrice(productData?.productSalesPrice.toString());
      }
      setKdvPercent(productData?.kdvPercent.toString());
      setIncludeKdv(productData?.includeKDV);
    }
  }, [productData, detailOrUpdate, handleClose]);


  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        className="rounded-lg"
      >
        <Fade in={open}>
          <Box sx={style} className="rounded-lg g text-white pt-6 px">
            <Typography
              variant="h6"
              component="h2"
              className="mb-4 gap-2 items-center justify-center text-lg font-bold text-center flex w-full"
            >
              Ürün İsmi: {productName}
            </Typography>
            <Typography
              variant="h6"
              component="h2"
              className="mb-4 gap-2 text-lg font-bold justify-center text-center flex w-full"
            >
              Ürün Kodu: {productCode}
            </Typography>
            <Typography
              variant="h6"
              component="h2"
              className="mb-4 gap-2 text-lg font-bold justify-center text-center flex w-full"
            >
              <label className="text-sm text-white font-bold text-center w-2/5 flex justify-end m-auto">
                Belgedeki Miktarı:
              </label>
              {detailOrUpdate ? (
               <div className=" w-1/2 flex gap-2 pr-2">
                 <Input
                  value={quantity}
                  className=" bg-white px-2 w-full"
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <p className="">{birim}</p>
               </div>
              ) : (
                <div className=" w-1/2 flex gap-2 pr-2">
                 <Input
                  value={quantity}
                  className=" bg-white px-2 w-full"
                  readOnly
                />
                <p className="">{birim}</p>
               </div>
              )}
            </Typography>
            <Typography
              variant="h6"
              component="h2"
              className="mb-4 gap-2 text-2xl font-bold justify-center text-center flex w-full"
            >
              {isGelen ? (
                <div className="flex w-full mt-2">
                  <label className="text-sm text-white font-bold text-center w-2/5 flex justify-end m-auto">
                    Alış Fiyatı:
                  </label>
                  {detailOrUpdate ? (
                    <Input
                      value={productPurchasePrice}
                      className="w-1/2 bg-white px-2"
                      onChange={(e) => setProductPurchasePrice(e.target.value)}
                    />
                  ) : (
                    <Input
                      value={productPurchasePrice}
                      className="w-1/2 bg-white px-2"
                      readOnly
                    />
                  )}
                </div>
              ) : (
                <div className="flex w-full">
                  <label className="text-sm text-white font-bold text-center w-2/5 flex justify-end m-auto">
                    Satış Fiyatı:
                  </label>
                  {detailOrUpdate ? (
                    <Input
                      value={productSalesPrice}
                      className="w-1/2 bg-white px-2"
                      onChange={(e) => setProductSalesPrice(e.target.value)}
                    />
                  ) : (
                    <Input
                      value={productPurchasePrice}
                      className="w-1/2 bg-white px-2"
                      readOnly
                    />
                  )}
                </div>
              )}
            </Typography>
            <Typography
              variant="h6"
              component="h2"
              className="mb-4 gap-2 text-2xl font-bold justify-center text-center flex w-full text-black"
            >
              <label className="text-xs text-white font- text-center w-2/12  flex justify-start items-start  my-auto mt-2">
                KDV Yüzdesi:
              </label>
              {detailOrUpdate ? (
                <div className="flex">
                  <div className="w-1/2  my-auto z-10">
                    {" "}
                    <Listbox
                      value={kdvPercent}
                      onChange={(newValue) => setKdvPercent(newValue)}
                    >
                      <div className="relative my-auto ">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10  shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white  text-center focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <span className="block truncate text-sm">
                            %{kdvPercent}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm text-black">
                            {percents.map((percent, personIdx) => (
                              <Listbox.Option
                                key={personIdx}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 text-black ${
                                    active
                                      ? "bg-amber-100 text-amber-900"
                                      : "text-gray-900"
                                  }`
                                }
                                value={percent.percent} // Sadece percent değerini kullanın
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block text-center text-black text-sm ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      %{percent.percent}
                                    </span>
                                    {selected ? (
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                        <CheckIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>
                  <div className="  flex gap-2 ">
                    <div className="w-full flex gap-2 items-center justify-center">
                      <label class="relative inline-flex items-center cursor-pointer">
                        <span class="ml-3 text-sm font-medium text-white dark:text-gray-300">
                          KDV {includeKdv ? "Dahil" : "Hariç"}
                        </span>
                        <input
                          type="checkbox"
                          checked={includeKdv}
                          onChange={() => setIncludeKdv(!includeKdv)}
                          class="sr-only peer"
                        />
                        <div class="w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[10px] after:right-[21px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex w-full mt-2">
                  <Input
                    value={kdvPercent}
                    className="w-1/2 bg-white px-2"
                    readOnly
                  />
                  <div className="  flex gap-2 ">
                    <div className="w-full flex gap-2 items-center justify-center">
                      <label class="relative inline-flex items-center cursor-pointer">
                        <span class="mx-2 text-sm font-medium text-white dark:text-gray-300">
                          KDV {includeKdv ? "Dahil" : "Hariç"}
                        </span>
                        <input
                          type="checkbox"
                          checked={includeKdv}
                          class="sr-only peer"
                          readOnly
                        />
                        <div class="w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[21px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </Typography>
            <Typography
              variant="h6"
              component="h2"
              className="mb-4 gap-2 text-lg font-bold justify-center text-center flex w-full"
            >
              Stoktaki Adet: {productQuantity}
            </Typography>
            <Typography
              variant="h6"
              component="h2"
              className="mb-4 gap-2 text-lg font-bold justify-center text-center flex w-full"
            >
              Açıklama: {productDescription}
            </Typography>
            <div className="w-full flex justify-end mt-4 gap-2">
              {detailOrUpdate ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleUpdateProductQuantity()}
                  type="primary"
                >
                  Kaydet
                </Button>
              ) : null}
              <Button
                variant=""
                color="primary"
                onClick={handleClose}
                type="primary"
                className="font-bold"
              >
                Kapat
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default BelgeUrunDetayModal;
