import React, { Fragment, useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Button, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "@headlessui/react";

import { useRouter } from "next/router";
import { addProduct } from "@/src/redux/slice/local-product-slice";
import {
  addIncomingProductToIncomingProductProcess,
  addIncomingProductToOutgoingProductProcess,
  addProductToIncomingVirtualDocProcess,
  addProductToOutgoingVirtualDocProcess,
  getAllProductsProcess,
  getIncomingProductDetailProcess,
  getOutgoingProductDetailProcess,
  getVirtualIncomingProductDetailProcess,
  getVirtualOutgoingProductDetailProcess,
} from "@/src/api";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import {
  showToastErrorMessage,
  showToastSuccesMessage,
} from "../ToastComponent";
import { resetAddIncomingProductToIncomingProduct } from "@/src/redux/slice/add-incoming-product-to-incoming-product-slice";
import { resetAddIncomingProductToOutgoingProduct } from "@/src/redux/slice/add-incoming-product-to-outgoing-product-slice";
import { resetAddIncomingProductToVirtualDoc } from "@/src/redux/slice/add-product-to-incoming-virtual-doc-slice";
import { resetAddProductToOutgoingVirtualDoc } from "@/src/redux/slice/add-product-to-outgoing-virtual-doc-slice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 370,
  bgcolor: "#000E36",
  border: "2px solid #FFF",
  boxShadow: 24,
  p: 4,
};

function decryptData(encryptedData) {
  const decryptedData = atob(encryptedData);
  return decryptedData;
}

const percents = [
  { percent: 20 },
  { percent: 18 },
  { percent: 10 },
  { percent: 8 },
  { percent: 1 },
];

const BelgeyeUrunEklemeModal = ({
  openBelgedenGelenModal,
  handleCloseBelgedenGelenModalOpen,
  ProductDetail,
}) => {
  const [productCode, setProductCode] = useState("");
  const [productName, setProductName] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState("");
  const [kdvPercent, setKdvPercent] = useState();
  const [productPurchasePrice, setProductPurchasePrice] = useState();
  const [productSalesPrice, setProductSalesePrice] = useState();
  const [includeKdv, setIncludeKdv] = useState(true);
  const [selected, setSelected] = useState(percents[0]);
  const [quantity, setQuantity] = useState(null);
  const [enabled, setEnabled] = useState(true);
  const [birim, setBirim] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const pageStok = router.query.a1;
  const decryptedPageStok = decryptData(pageStok ? pageStok : null);
  const documentId = router.query.a2;
  const decryptedDocumentId = decryptData(documentId ? documentId : null);

  const { data: virtualDocData } = useSelector(
    (state) => state.addVirtualIncomingDoc
  );

  const { data: newOutgoingVirtualDoc } = useSelector(
    (state) => state.addVirtualOutgoingDoc
  );

  const {
    status: addProductToIncomingProductStatus,
    message: addProductToIncomingProductMessage,
  } = useSelector((state) => state.addProductToIncomingProduct);
  const {
    status: addProductToOutgoingProductStatus,
    message: addProductToOutgoingProductMessage,
  } = useSelector((state) => state.addProductToOutgoingProduct);

  const {
    status: addProductToIncomingVirtualDocStatus,
    message: addProductToIncomingVirtualDocMessage,
  } = useSelector((state) => state.addProductToIncomingVirtualDoc);
  const {
    status: addProductToOutgoingVirtualDocStatus,
    message: addProductToOutgoingVirtualDocMessage,
  } = useSelector((state) => state.addProductToOutgoingVirtualDoc);

  useEffect(() => {
    if (ProductDetail) {
      setProductCode(ProductDetail.productCode);
      setProductName(ProductDetail.productName);
      setProductQuantity(ProductDetail.productQuantity);
      setProductDescription(ProductDetail.productDescription);
      setProductImage(ProductDetail.productImage);
      setBirim(ProductDetail.productPackageType);
      //   setQuantity(productData.quantity.toString());
    }
  }, [ProductDetail]);

  const docId = decryptedPageStok == 2 ? virtualDocData : newOutgoingVirtualDoc;

  const handleAddProduct = async () => {
    if (decryptedDocumentId != "ée") {
      if (decryptedPageStok == 2) {
        await dispatch(
          addIncomingProductToIncomingProductProcess({
            incomingProductId: decryptedDocumentId,
            productId: ProductDetail._id,
            productQuantity: quantity,
            kdvPercent: selected.percent,
            includeKdv: enabled,
            productPurchasePrice: productPurchasePrice,
          })
        );
        await dispatch(getAllProductsProcess());
        await dispatch(
          getIncomingProductDetailProcess({
            incomingProductId: decryptedDocumentId,
          })
        );
      } else if (decryptedPageStok == 1) {
        await dispatch(
          addIncomingProductToOutgoingProductProcess({
            outgoingProductId: decryptedDocumentId,
            productId: ProductDetail._id,
            productQuantity: quantity,
            kdvPercent: selected.percent,
            includeKdv: enabled,
            productSalesPrice: productSalesPrice,
          })
        );
        await dispatch(getAllProductsProcess());
        await dispatch(
          getOutgoingProductDetailProcess({
            outgoingProductId: decryptedDocumentId,
          })
        );
      }
    } else {
      const quantityToAdd = parseInt(quantity, 10);
      const newProduct = {
        virtualDocId: docId?._id,
        productId: ProductDetail._id,
        productQuantity: quantity,
        productName: productName,
        productCode: productCode,
        quantity: quantityToAdd,
        productDescription: productDescription,
        productImage: productImage,
        productPurchasePrice: productPurchasePrice,
        productSalesPrice: productSalesPrice,
        kdvPercent: selected.percent,
        includeKdv: enabled,
      };

      if (decryptedPageStok == 2) {
        await dispatch(addProductToIncomingVirtualDocProcess(newProduct));
        await dispatch(
          getVirtualIncomingProductDetailProcess({
            virtualDocId: virtualDocData?._id,
          })
        );
      } else if (decryptedPageStok == 1) {
        dispatch(addProductToOutgoingVirtualDocProcess(newProduct));
        await dispatch(
          getVirtualOutgoingProductDetailProcess({
            virtualDocId: newOutgoingVirtualDoc?._id,
          })
        );
      }
      setQuantity("");
    }
  };

  useEffect(() => {
    if (addProductToIncomingProductStatus === "success") {
      setQuantity(null);
      setSelected(percents[0]);
      setEnabled(true);
      setProductPurchasePrice("");
      setProductSalesePrice("");
      handleCloseBelgedenGelenModalOpen();
      showToastSuccesMessage(addProductToIncomingProductMessage);
      dispatch(resetAddIncomingProductToIncomingProduct());
      router.push("/stokTakip/belgeDetay");
    }
    if (addProductToOutgoingProductStatus === "success") {
      setQuantity(null);
      setSelected(percents[0]);
      setEnabled(true);
      setProductPurchasePrice("");
      setProductSalesePrice("");
      handleCloseBelgedenGelenModalOpen();
      showToastSuccesMessage(addProductToOutgoingProductMessage);
      dispatch(resetAddIncomingProductToOutgoingProduct());
      router.push("/stokTakip/belgeDetay");
    } else if (addProductToIncomingProductStatus === "error") {
      showToastErrorMessage(addProductToIncomingProductMessage);
      dispatch(resetAddIncomingProductToIncomingProduct());
    } else if (addProductToOutgoingProductStatus === "error") {
      showToastErrorMessage(addProductToOutgoingProductMessage);
      dispatch(resetAddIncomingProductToOutgoingProduct());
    }
    if (addProductToIncomingVirtualDocStatus === "success") {
      handleCloseBelgedenGelenModalOpen();
      showToastSuccesMessage(addProductToIncomingVirtualDocMessage);
      dispatch(resetAddIncomingProductToVirtualDoc());
      router.push("/stokTakip/urunGiris");
    } else if (addProductToIncomingVirtualDocStatus === "error") {
      showToastErrorMessage(addProductToIncomingVirtualDocMessage);
      dispatch(resetAddIncomingProductToVirtualDoc());
      router.push("/stokTakip");
      handleCloseBelgedenGelenModalOpen();
    }
    if (addProductToOutgoingVirtualDocStatus === "success") {
      handleCloseBelgedenGelenModalOpen();
      showToastSuccesMessage(addProductToOutgoingVirtualDocMessage);
      dispatch(resetAddProductToOutgoingVirtualDoc());
      router.push("/stokTakip/urunCikis");
    } else if (addProductToOutgoingVirtualDocStatus === "error") {
      showToastErrorMessage(addProductToOutgoingVirtualDocMessage);
      dispatch(resetAddProductToOutgoingVirtualDoc());
      router.push("/stokTakip");
      handleCloseBelgedenGelenModalOpen();
    }
  }, [
    addProductToIncomingProductStatus,
    addProductToOutgoingProductStatus,
    addProductToIncomingVirtualDocStatus,
    addProductToOutgoingVirtualDocStatus,
  ]);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openBelgedenGelenModal}
        onClose={handleCloseBelgedenGelenModalOpen}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        className="rounded-lg"
      >
        <Fade in={openBelgedenGelenModal}>
          <Box sx={style} className="rounded-lg g text-white pt-6 px">
            <Typography
              variant="h6"
              component="h2"
              className="mb-4 gap-2 items-center justify-center text-2xl font-bold text-center flex w-full"
            >
              Ürün İsmi: {productName}
            </Typography>
            <Typography
              variant="h6"
              component="h2"
              className="mb-4 gap-2 text-2xl font-bold justify-center text-center flex w-full"
            >
              Ürün Kodu: {productCode}
            </Typography>
            <Typography
              variant="h6"
              component="h2"
              className="mb-4 gap-2 text-2xl font-bold justify-center text-center flex w-full"
            >
              <label className="text-lg text-white font-bold text-center w-2/5 flex justify-end">
                Ürün Miktarı:
              </label>
              <div className="flex w-3/5 gap-2 pr-2">
              <Input
                value={quantity}
                className=" bg-white px-2"
                onChange={(e) => setQuantity(e.target.value)}
              />
              <p>{birim}</p>
              </div>
            </Typography>
            <Typography
              variant="h6"
              component="h2"
              className="mb-4 gap-2 text-2xl font-bold justify-center text-center flex w-full"
            >
              <label className="text-xs text-white font-bold text-center w-2/5 flex justify-end my-auto">
                Ürün {decryptedPageStok == 2 ? "Alış" : "Satış"} Fiyatı :
              </label>
              <Input
                value={
                  decryptedPageStok == 2
                    ? productPurchasePrice
                    : productSalesPrice
                }
                className="w-3/5 bg-white px-2 mt-1"
                onChange={(e) => {
                  decryptedPageStok == 2
                    ? setProductPurchasePrice(e.target.value)
                    : setProductSalesePrice(e.target.value);
                }}
              />
            </Typography>
            <Typography
              variant="h6"
              component="h2"
              className="mb-4 gap-2 md:text-2xl font-bold justify-center text-center flex w-full text-black mt-2"
            >
              <label className="text-xs text-white font- text-center w-1/12  flex justify-end my-auto mt-2">
                KDV Yüzdesi:
              </label>
              <div className="w-2/5  mt-2">
                {" "}
                <Listbox value={selected} onChange={setSelected}>
                  <div className="relative my-auto ">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10  shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white  text-center focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span className="block truncate text-sm">
                        %{selected.percent}
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
                            value={percent}
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
              <div className="py-1 w-1/6 flex gap-2 ml-2 mt-2">
                <p className="text-xs text-white my-auto">
                  KDV {enabled ? "Dahil" : "Hariç"}
                </p>
                <Switch
                  checked={enabled}
                  onChange={() => setEnabled(!enabled)}
                  className={`${enabled ? "bg-teal-900" : "bg-teal-700"}
          relative inline-flex h-[28px] w-[44px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75 my-auto`}
                >
                  <span className="sr-only">Use setting</span>
                  <span
                    aria-hidden="true"
                    className={`${enabled ? "translate-x-4" : "translate-x-0"}
            pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                  />
                </Switch>
              </div>
            </Typography>
            <Typography
              variant="h6"
              component="h2"
              className="mb-4 gap-2 text-2xl font-bold justify-center text-center flex w-full"
            >
              Stoktaki Adet: {productQuantity}
            </Typography>
            <Typography
              variant="h6"
              component="h2"
              className="mb-4 gap-2 text-2xl font-bold justify-center text-center flex w-full"
            >
              Açıklama: {productDescription}
            </Typography>
            <div className="w-full flex justify-end mt-4 gap-6">
              <button
                className="font-bold px-4 bg-blue-500 py-2 rounded-lg hover:bg-blue-700 duration-200"
                onClick={handleAddProduct}
                type="primary"
              >
                Kaydet
              </button>
              <button
                className="font-bold px-4 bg-red-500 py-2 rounded-lg hover:bg-red-700 duration-200"
                onClick={handleCloseBelgedenGelenModalOpen}
                type="primary"
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

export default BelgeyeUrunEklemeModal;
