import {
  addIncomingProductProcess,
  addIncomingProductWithProductsProcess,
  addOutgoingProductProcess,
  addOutgoingProductWithProductsProcess,
  deleteProductFromIncomingVirtualDocProcess,
  deleteProductFromOutgoingProductProcess,
  deleteProductFromOutgoingVirtualDocProcess,
  deleteVirtualIncomingDocProcess,
  deleteVirtualOutgoingDocProcess,
  getIncomingProductDetailProcess,
  getMusteriOrdersProcess,
  getNextDocumentNumberProcess,
  getOrderDetailProcess,
  getOutgoingProductDetailProcess,
  getTedarikciOrdersProcess,
  getVirtualIncomingProductDetailProcess,
  getVirtualOutgoingProductDetailProcess,
} from "@/src/api";
import { Button, Input } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  InboxIcon,
} from "@heroicons/react/20/solid";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextareaAutosize,
} from "@mui/material";
import { useRouter } from "next/router";
import { resetOrderDetail } from "@/src/redux/slice/get-order-detail-slice";
import logo2 from "../../../public/images/logo2.png";
import add from "../../../public/images/add.png";
import Image from "next/image";
import DeleteModal from "../DeleteModal";
import { resetAddIncomingProductWithProducts } from "@/src/redux/slice/add-incoming-product-with-products-slice";
import BelgeUrunDetayModal from "../Belgeler/BelgeDetayModal";
import {
  showToastErrorMessage,
  showToastSuccesMessage,
} from "../ToastComponent";
import {
  resetProducts,
  removeProduct,
} from "@/src/redux/slice/local-product-slice";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { resetGetVirtualIncomingProductDetail } from "@/src/redux/slice/get-virtual-incoming-product-detail-process-slice";
import { resetVirtualIncomingDoc } from "@/src/redux/slice/add-virtual-incoming-doc-slice";
import { resetAddOutgoingProductWithProducts } from "@/src/redux/slice/add-outgoing-product-with-products-slice";
import { resetGetVirtualOutgoingProductDetail } from "@/src/redux/slice/get-virtual-outgoing-product-detail-process-slice";
import { resetAddVirtualOutgoingDoc } from "@/src/redux/slice/add-virtual-outgoing-doc-slice";
import { resetAddIncomingProductToVirtualDoc } from "@/src/redux/slice/add-product-to-incoming-virtual-doc-slice";
import { resetUpdateIncomingVirtualDocProducts } from "@/src/redux/slice/update-incoming-virtual-doc-products-slice";
import { resetUpdateOutgoingVirtualDocProducts } from "@/src/redux/slice/update-outgoing-virtual-doc-products-slice";
import { resetDeleteProductFromIncomingVirtualDoc } from "@/src/redux/slice/delete-product-from-incoming-virtual-doc-slice";
import { resetDeleteProductFromOutgoingVirtualDoc } from "@/src/redux/slice/delete-product-from-outgoing-virtual-doc-slice";

const defaultDocumentDate = new Date().toISOString().split("T")[0];

const columns = [
  {
    id: "productImage",
    label: "",
    render: (item) => {
      return (
        <img src={item.productImage} alt="Ürün Resmi" width={50} height={50} />
      );
    },
  },
  { id: "productCode", label: "Ürün Kodu", minWidth: 170 },
  { id: "quantity", label: "Belgedeki Adedi", minWidth: 100 },
  { id: "productQuantity", label: "Stoktaki Adet", minWidth: 100 },
  { id: "productDescription", label: "Açıklama", minWidth: 110 },
  {
    id: "actions",
    label: "İşlemler",
    minWidth: 100,
  },
  // Diğer sütunlar...
];

function encryptData(data) {
  const encryptedData = btoa(data);
  return encryptedData;
}

const BelgeOluşturma = () => {
  const [documentDate, setDocumentDate] = useState(defaultDocumentDate);
  const [documentNumber, setDocumentNumber] = useState("");
  const [order, setOrder] = useState(null);
  const [description, setDescription] = useState("");
  const [orderName, setOrderName] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [detailOrUpdate, setDetailOrUpdate] = useState(false);
  const [text, setText] = useState("");
  const [iptal, setIptal] = useState(false);

  const [open2, setOpen2] = React.useState(true);

  const handleClick = () => {
    setOpen2(!open2);
  };

  const handleCloseDeleteModal = () => setOpenDeleteModal(false);
  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };

  useEffect(() => {
    if (!iptal) {
      setText("Bu ürünü belgeden");
    } else {
      setText("Belgede yapılan değişikleri");
    }
  }, [iptal]);

  const dispatch = useDispatch();
  const router = useRouter();
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { pathname } = router;
  useEffect(() => {
    dispatch(getTedarikciOrdersProcess());
    dispatch(getMusteriOrdersProcess());
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const isGelen = pathname === "/stokTakip/urunGiris" ? true : false;

  const handleUrunEkleBelgeye = async () => {
    const encryptedPageStok = isGelen ? encryptData(2) : encryptData(1);

    await router.push({
      pathname: "/stokTakip/",
      query: { a1: encryptedPageStok },
    });
  };

  const [selectedProductData, setSelectedProductData] = useState(null);

  const tedarikciOrders = useSelector((state) => state.getTedarikciOrders.data);
  const musteriOrders = useSelector((state) => state.getMusteriOrders.data);
  const addIncomingProduct = useSelector(
    (state) => state.addIncomingProduct.data
  );
  const addOutgoingProduct = useSelector(
    (state) => state.addOutgoingProduct.data
  );
  const { data: getNextDocumentNumber } = useSelector(
    (state) => state.getNextDocumentNumber
  );

  const { data: virtualDocData } = useSelector(
    (state) => state.addVirtualIncomingDoc
  );
  const { data: fil } = useSelector(
    (state) => state.virtualIncomingProductDetail
  );

  const { data: newOutgoingVirtualDoc } = useSelector(
    (state) => state.addVirtualOutgoingDoc
  );

  const { data: outgoingVirtualDocDetail } = useSelector(
    (state) => state.getVirtualOutgoingProductDetail
  );
  const { status: addIncomingProductWithProductsStatus } = useSelector(
    (state) => state.addIncomingProductWithProducts
  );
  const { status: addOutgoingProductWithProductsStatus } = useSelector(
    (state) => state.addOutgoingProductWithProducts
  );
  const {
    status: updateIncomingVirtualDocProductsStatus,
    message: updateIncomingVirtualDocProductsMessage,
  } = useSelector((state) => state.updateIncomingVirtualDocProducts);
  const {
    status: updateOutgoingVirtualDocProductsStatus,
    message: updateOutgoingVirtualDocProductsMessage,
  } = useSelector((state) => state.updateOutgoingVirtualDocProducts);
  const {
    status: deleteProductFromIncomingVirtualDocStatus,
    message: deleteProductFromIncomingVirtualDocMessage,
  } = useSelector((state) => state.deleteProductFromIncomingVirtualDoc);
  const {
    status: deleteProductFromOutgoingVirtualDocStatus,
    message: deleteProductFromOutgoingVirtualDocMessage,
  } = useSelector((state) => state.deleteProductFromOutgoingVirtualDoc);

  const handleDeleteProduct = async () => {
    if (!iptal) {
      try {
        if (isGelen) {
          await dispatch(
            deleteProductFromIncomingVirtualDocProcess({
              productId: selectedProductId,
              virtualDocId: virtualDocData?._id,
            })
          );
          await dispatch(
            getVirtualIncomingProductDetailProcess({
              virtualDocId: virtualDocData?._id,
            })
          );
        } else {
          await dispatch(
            deleteProductFromOutgoingVirtualDocProcess({
              productId: selectedProductId,
              virtualDocId: newOutgoingVirtualDoc?._id,
            })
          );
          await dispatch(
            getVirtualOutgoingProductDetailProcess({
              virtualDocId: newOutgoingVirtualDoc?._id,
            })
          );
        }
        handleCloseDeleteModal();
      } catch (error) {
        console.error("Ürün silme işlemi başarısız oldu:", error);
      }
    } else {
      if (pathname === "/stokTakip/urunGiris") {
        await dispatch(
          deleteVirtualIncomingDocProcess({ virtualDocId: virtualDocData._id })
        );
         router.push("/stokTakip/belgeler");
      } else {
        await dispatch(
          deleteVirtualOutgoingDocProcess({
            virtualDocId: newOutgoingVirtualDoc._id,
          })
        );
         router.push("/stokTakip/belgeler");
      }
    }
  };

  useEffect(() => {
    if (virtualDocData) {
      dispatch(
        getVirtualIncomingProductDetailProcess({
          virtualDocId: virtualDocData?._id,
        })
      );
    } else if (newOutgoingVirtualDoc) {
      dispatch(
        getVirtualOutgoingProductDetailProcess({
          virtualDocId: newOutgoingVirtualDoc?._id,
        })
      );
    }
  }, [virtualDocData, newOutgoingVirtualDoc]);

  const filteredeData =
    pathname === "/stokTakip/urunGiris" ? fil : outgoingVirtualDocDetail;

  const {
    status: productsToOutgoingStatus,
    message: productsToOutgoingAddMessage,
    data: productsToOutgoingAddData,
  } = useSelector((state) => state.addOutgoingProductWithProducts);

  const {
    status: productsToAddStatus,
    message: productsToAddMessage,
    data: productsToAddData,
  } = useSelector((state) => state.addIncomingProductWithProducts);

  useEffect(() => {
    dispatch(getNextDocumentNumberProcess());
  }, []);

  const handleNewDoc = async () => {
    if (pathname === "/stokTakip/urunGiris") {
      await dispatch(
        addIncomingProductWithProductsProcess({
          documentDate: documentDate,
          order: order,
          description: description,
          virtualDocId: virtualDocData._id,
        })
      );
    } else if (pathname === "/stokTakip/urunCikis") {
      await dispatch(
        addOutgoingProductWithProductsProcess({
          documentDate: documentDate,
          order: order,
          description: description,
          virtualDocId: newOutgoingVirtualDoc._id,
        })
      );
    }

    await setDocumentNumber("");
    // await setOrder(null);
    await setDescription("");
    await setOrderName(null);
    await dispatch(resetOrderDetail());
  };
  useEffect(() => {
    dispatch(getOrderDetailProcess({ _id: order }));
  }, [order]);

  const { data: OrderDetail } = useSelector((state) => state.orderDetail);

  const {
    status: addProductToIncomingVirtualDocStatus,
    message: addProductToIncomingVirtualDocMessage,
  } = useSelector((state) => state.addProductToIncomingVirtualDoc);

  useEffect(() => {
    dispatch(resetOrderDetail());
  }, [pathname]);

  useEffect(() => {
    if (OrderDetail) {
      setOrderName(OrderDetail.isim);
    } else {
      setOrderName(null);
    }
  }, [OrderDetail]);

  useEffect(() => {
    if (updateIncomingVirtualDocProductsStatus === "success") {
      showToastSuccesMessage(updateIncomingVirtualDocProductsMessage);
      dispatch(resetUpdateIncomingVirtualDocProducts());
    } else if (updateIncomingVirtualDocProductsStatus === "error") {
      showToastErrorMessage(updateIncomingVirtualDocProductsMessage);
      dispatch(resetUpdateIncomingVirtualDocProducts());
    }
    if (updateOutgoingVirtualDocProductsStatus === "success") {
      showToastSuccesMessage(updateOutgoingVirtualDocProductsMessage);
      dispatch(resetUpdateOutgoingVirtualDocProducts());
    } else if (updateOutgoingVirtualDocProductsStatus === "error") {
      showToastErrorMessage(updateOutgoingVirtualDocProductsMessage);
      dispatch(resetUpdateOutgoingVirtualDocProducts());
    }
    if (deleteProductFromIncomingVirtualDocStatus === "success") {
      showToastSuccesMessage(deleteProductFromIncomingVirtualDocMessage);
      dispatch(resetDeleteProductFromIncomingVirtualDoc());
    } else if (deleteProductFromIncomingVirtualDocStatus === "error") {
      showToastErrorMessage(deleteProductFromIncomingVirtualDocMessage);
      dispatch(resetDeleteProductFromIncomingVirtualDoc());
    }
    if (deleteProductFromOutgoingVirtualDocStatus === "success") {
      showToastSuccesMessage(deleteProductFromOutgoingVirtualDocMessage);
      dispatch(resetDeleteProductFromOutgoingVirtualDoc());
    } else if (deleteProductFromOutgoingVirtualDocStatus === "error") {
      showToastErrorMessage(deleteProductFromOutgoingVirtualDocMessage);
      dispatch(resetDeleteProductFromOutgoingVirtualDoc());
    }
  }, [
    updateIncomingVirtualDocProductsStatus,
    updateOutgoingVirtualDocProductsStatus,
    deleteProductFromIncomingVirtualDocStatus,
    deleteProductFromOutgoingVirtualDocStatus,
  ]);

  useEffect(() => {
    if (productsToAddStatus === "success") {
      dispatch(resetProducts());
      router.push("/stokTakip/belgeDetay");
      dispatch(
        getIncomingProductDetailProcess({
          incomingProductId: productsToAddData._id,
        })
      );
      dispatch(resetAddIncomingProductWithProducts());
    } else if (productsToAddStatus === "error") {
      showToastErrorMessage(productsToAddMessage);
      dispatch(resetAddIncomingProductWithProducts());
    }
    if (productsToOutgoingStatus === "success") {
      dispatch(resetProducts());
      router.push("/stokTakip/belgeDetay");
      dispatch(
        getOutgoingProductDetailProcess({
          outgoingProductId: productsToOutgoingAddData._id,
        })
      );
      dispatch(resetAddOutgoingProductWithProducts());
    } else if (productsToOutgoingStatus === "error") {
      showToastErrorMessage(productsToOutgoingAddMessage);
      dispatch(resetAddOutgoingProductWithProducts());
    }
  }, [productsToAddStatus, productsToOutgoingStatus]);

  const handleOpenModal = (productData) => {
    setSelectedProductData(productData);
    setOpen(true);
  };

  const options =
    pathname === "/stokTakip/urunGiris" ? tedarikciOrders : musteriOrders;

  const goToDocDetail = async (incomingProductId, outgoingProductId) => {
    if (pathname === "/stokTakip/urunCikis" && outgoingProductId) {
      await dispatch(getOutgoingProductDetailProcess({ outgoingProductId }));

      await router.push("/stokTakip/belgeDetay");
    }

    if (pathname === "/stokTakip/urunGiris" && incomingProductId) {
      await dispatch(getIncomingProductDetailProcess({ incomingProductId }));
      await router.push("/stokTakip/belgeDetay");
    }
  };

  // useEffect(() => {
  //   if(pathname === "/stokTakip/urunCikis"){
  //     dispatch(resetProducts())
  //   }
  // }, [pathname])

  useEffect(() => {
    const incomingProductId = addIncomingProduct?._id;
    const outgoingProductId = addOutgoingProduct?._id;

    if (
      (pathname === "/stokTakip/urunCikis" && outgoingProductId) ||
      (pathname === "/stokTakip/urunGiris" && incomingProductId)
    ) {
      goToDocDetail(incomingProductId, outgoingProductId);
    }
  }, [addIncomingProduct?._id, addOutgoingProduct?._id]);

  useEffect(() => {
    if (addIncomingProductWithProductsStatus === "success") {
      dispatch(resetAddIncomingProductWithProducts());
      dispatch(resetGetVirtualIncomingProductDetail());
      dispatch(resetVirtualIncomingDoc());
    }
    if (addOutgoingProductWithProductsStatus === "success") {
      dispatch(resetAddOutgoingProductWithProducts());
      dispatch(resetGetVirtualOutgoingProductDetail());
      dispatch(resetAddVirtualOutgoingDoc());
    }
  }, [
    addIncomingProductWithProductsStatus,
    addOutgoingProductWithProductsStatus,
  ]);

  return (
    <div className="h-full w-full bg-light rounded-lg px-2   md:py-8 py-2 flex flex-col ">
      {/* Büyük Ekran */}
      <div className="w-full flex md:flex-row flex-col ">
        <h2 className="text-2xl md:flex hidden font-bold text-center justify-center items-center w-full">
          Ürün {pathname === "/stokTakip/urunGiris" ? "Giriş" : "Çıkış"} Belgesi
          Oluşturma
        </h2>
        {/* Küçük Ekran */}
        <p className=" text-lg font-bold mb-2 flex md:hidden justify-center items-center mx-auto">
          Ürün {pathname === "/stokTakip/urunGiris" ? "Giriş" : "Çıkış"} Belgesi
          Oluşturma
        </p>
        <div className="flex gap-2">
          <Button
            className=" mx-auto bg-red-900 mb-2 text-white"
            onClick={() => {
              handleOpenDeleteModal();
              setIptal(true);
            }}
          >
            İptal
          </Button>
          <Button
            type="primary"
            className=" mx-auto bg-blue-900 mb-2"
            onClick={handleNewDoc}
          >
            Belge Oluştur
          </Button>
        </div>
      </div>
      {/* Büyük Ekran */}
      <div className="w-full ">
        <div className="w-full flex flex-col md:gap-6 gap-1 ">
          <div className=" w-full md:flex hidden justify-around ">
            {/* Büyük Ekran */}
            <div className="flex gap-2">
              <p className="text-xl font-bold my-auto">Belge Tarihi : </p>
              <input
                value={documentDate}
                className="w-40 text-center my-auto"
                type="Date"
                onChange={(e) => setDocumentDate(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <p className="text-xl font-bold my-auto">Belge No : </p>
              <input
                value={getNextDocumentNumber}
                className="w-auto text-center my-auto"
                readOnly
              />
            </div>
          </div>
          {/* Küçük Ekran */}
          <div className=" w-full flex flex-col md:hidden  justify-between items-center mx-auto pr-3  ">
            <div className="flex w-full justify-center items-center gap-2 ">
              <p className="w-2/5 text-end text-sm font-bold my-auto">
                Belge Tarihi :{" "}
              </p>
              <input
                value={documentDate}
                className="w-3/5 h-7 text-center my-auto"
                type="Date"
                onChange={(e) => setDocumentDate(e.target.value)}
              />
            </div>
            <div className="flex w-full justify-center items-center gap-2 mt-2">
              <p className="w-2/5 text-end text-sm font-bold my-auto">
                Belge No :{" "}
              </p>
              <input
                value={getNextDocumentNumber}
                className="w-3/5 h-7 text-center my-auto"
                readOnly
                // onChange={(e) => setDocumentNumber(e.target.value)}
              />
            </div>
          </div>
          {/* Büyük Ekran */}
          <div className="md:flex hidden w-full justify-around  ">
            <div className="flex gap-2">
              <p className="text-xl font-bold my-auto">
                {pathname === "/stokTakip/urunGiris"
                  ? "Satıcı : "
                  : "Müşteri : "}
              </p>
              <div className="relative z-10 w-44">
                <Listbox value={order} onChange={setOrder}>
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span className="block truncate">
                        {" "}
                        {orderName
                          ? orderName
                          : pathname === "/stokTakip/urunGiris"
                          ? "Satıcı Seç"
                          : "Müşteri Seç"}
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
                      <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {options &&
                          options.map((option, optionIdx) => (
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
                                    {option.isim}
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
            <div className="flex gap-2">
              <p className="text-xl font-bold my-auto">Belge Açıklaması : </p>
              <TextareaAutosize
                minRows={2}
                maxRows={2}
                value={description}
                className="w-52 h-8 px-1 rounded-lg  my-auto text-black text-sm bg-gray-300"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full md:flex hidden justify-end items-end ">
            <div
              className="flex justify-end items-end   bg-blue-900 hover:bg-blue-700 lg:gap-3 md:gap-2 gap-1 text-white duration-500 py-1 px-2 rounded-lg cursor-pointer "
              onClick={handleUrunEkleBelgeye}
            >
              <Image
                src={add}
                alt="Ürün Ekle"
                className="cursor-pointer flex justify-center items-center my-auto"
                width={25}
              />
              <h2 className="lg:text-xl md:text-lg text-xs flex justify-center items-center my-auto">
                Yeni Ürün Ekle
              </h2>
            </div>
          </div>

          {/* Küçük Ekran */}
          <div className=" w-full flex md:hidden flex-col justify-between items-center mx-auto  mb-4 ">
            <div className="flex gap-2 w-full">
              <p className="w-2/5 text-end text-sm font-bold my-auto">
                {pathname === "/stokTakip/urunGiris"
                  ? "Satıcı : "
                  : "Müşteri : "}
              </p>
              <div className="w-3/5 h-7 text-center my-auto flex pr-3 ">
                <Listbox value={order} onChange={setOrder}>
                  <div className="relative mt-1 w-full">
                    <Listbox.Button className="relative w-full   h-7 cursor-default rounded-lg bg-white  pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span className="block truncate">
                        {orderName
                          ? orderName
                          : pathname === "/stokTakip/urunGiris"
                          ? "Satıcı Seç"
                          : "Müşteri Seç"}
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
                      <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {options &&
                          options.map((option, optionIdx) => (
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
                                    {option.isim}
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
            <div className="w-full flex gap-2 mt-3 pr-2 ">
              <p className="w-2/5 text-end text-sm font-bold my-auto">
                Açıklama :{" "}
              </p>
              <TextareaAutosize
                minRows={3}
                maxRows={3}
                value={description}
                className="w-3/5 h-8 overflow-y-auto px-2 py-1 my-auto rounded-lg bg-blue-gray-100"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="w-full flex md:hidden justify-center  items-center mt-3 ">
              <div
                className="flex justify-end items-end   bg-blue-900 hover:bg-blue-700 lg:gap-3 md:gap-2 gap-1 text-white duration-500 py-1 px-2 rounded-lg cursor-pointer "
                onClick={handleUrunEkleBelgeye}
              >
                <Image
                  src={add}
                  alt="Ürün Ekle"
                  className="cursor-pointer flex justify-center items-center my-auto"
                  width={25}
                />
                <h2 className="lg:text-xl md:text-lg text-xs flex justify-center items-center my-auto">
                  Yeni Ürün Ekle
                </h2>
              </div>
            </div>
          </div>
          <div className="w-full bg-gray-600 h-1 rounded-full " />

          {/* Büyük Ekran */}
          <div className="md:flex hidden">
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth, font: "bold" }}
                          className="text-xl font-bold"
                        >
                          {column.id === "productImage"
                            ? "Ürün İsmi"
                            : column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  {filteredeData?.products &&
                  filteredeData?.products.length > 0 ? (
                    filteredeData.products.map((productData) => (
                      <TableRow
                        key={productData._id}
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        onClick={() => {
                          handleOpenModal(productData);
                          setDetailOrUpdate(false);
                        }}
                        className="cursor-pointer"
                      >
                        {columns.map((column) => {
                          if (column.id === "productImage") {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {productData.product.productImage ? (
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <div
                                      style={{
                                        maxWidth: "80px",
                                        maxHeight: "100px",
                                      }}
                                    >
                                      {column.render(productData.product)}
                                    </div>
                                    <span style={{ marginLeft: "10px" }}>
                                      {productData?.product?.productName}
                                    </span>
                                  </div>
                                ) : (
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <div
                                      style={{
                                        maxWidth: "80px",
                                        maxHeight: "100px",
                                      }}
                                    >
                                      <Image
                                        src={logo2}
                                        alt="Logo"
                                        layout="responsive"
                                        width={80}
                                        height={100}
                                        objectFit="contain"
                                        className="min-h-[40px]"
                                      />
                                    </div>
                                    <span style={{ marginLeft: "10px" }}>
                                      {productData?.product?.productName}
                                    </span>
                                  </div>
                                )}
                              </TableCell>
                            );
                          } else if (column.id === "productDescription") {
                            const value =
                              productData.product.productDescription;
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {value}
                              </TableCell>
                            );
                          } else if (column.id === "productCode") {
                            const value = productData.product.productCode;
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {value}
                              </TableCell>
                            );
                          } else if (column.id === "productQuantity") {
                            const value = productData.product.productQuantity;
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {value}
                              </TableCell>
                            );
                          } else if (column.id === "actions") {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <Button
                                  variant="outlined"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleOpenModal(productData);
                                    setDetailOrUpdate(true);
                                  }}
                                  className="mr-2"
                                >
                                  Düzenle
                                </Button>
                                <Button
                                  variant="outlined"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedProductId(productData._id);
                                    handleOpenDeleteModal();
                                    setIptal(false);
                                  }}
                                >
                                  Sil
                                </Button>
                              </TableCell>
                            );
                          } else {
                            const value = productData[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {value}
                              </TableCell>
                            );
                          }
                        })}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={columns.length} align="center">
                        Aradığınız ürün bulunamadı.
                      </TableCell>
                    </TableRow>
                  )}
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={filteredeData?.products.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
          {/* Küçük Ekran */}
          <div className=" flex-col md:hidden w-full max-h-[350px] overflow-y-auto inline-block">
            {/* Map and display the content here */}
            {filteredeData?.products && filteredeData?.products.length > 0 ? (
              filteredeData.products.map((productData) => (
                <div
                  key={productData._id}
                  className="cursor-pointer border-2 border-dark-purple my-1 rounded-lg px-2 py-1 "
                  onClick={() => {
                    handleOpenModal(productData);
                    setDetailOrUpdate(false);
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {/* Ürün Resmi */}
                    <div
                      style={{
                        maxWidth: "150px",
                        maxHeight: "100px",
                        display: "flex",
                      }}
                    >
                      {productData.product.productImage ? (
                        <img
                          src={productData.product.productImage}
                          width={40}
                          className="h-[50px] "
                        />
                      ) : (
                        <Image
                          src={logo2}
                          alt="Placeholder"
                          layout="responsive"
                          width={80}
                          height={100}
                          objectFit="contain"
                          className="min-h-[40px]"
                        />
                      )}
                      <span className="m-auto font-semibold w-full ml-2">
                        {productData.product.productName}
                      </span>
                    </div>

                    {/* Ürün Adı */}

                    {/* Adet ve Fiyat */}
                    <div className="flex flex-col ">
                      {productData.product.productQuantity && (
                        <p className="font-semibold">
                          Adet: {productData.product.productQuantity}
                        </p>
                      )}
                      {productData.product.productPrice && (
                        <p className="font-semibold">
                          Fiyat: {productData.product.productPrice}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Düzenle ve Sil Düğmeleri */}
                  <div className="flex justify-between">
                    <p className="text-xs font-semibold mt-1">
                      Stok Kodu:{productData.product.productCode}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "8px",
                      }}
                      className="gap-3"
                    >
                      <Button
                        className="px-1 bg-blue-700 rounded-lg text-white py-1 text-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenModal(productData);
                          setDetailOrUpdate(true);
                        }}
                      >
                        Düzenle
                      </Button>
                      <Button
                        className="px-3 bg-red-700 rounded-lg text-white py-1 text-sm"
                        variant="outlined"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProductId(productData._id);
                          handleOpenDeleteModal();
                          setIptal(false);
                        }}
                      >
                        Sil
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="cursor-pointer">
                <div colSpan={columns.length} align="center">
                  Aradığınız isimde ürün bulunamadı.
                </div>
              </div>
            )}
          </div>
        </div>
        <BelgeUrunDetayModal
          data={filteredeData}
          open={open}
          handleClose={handleClose}
          productData={selectedProductData}
          isGelen={isGelen}
          detailOrUpdate={detailOrUpdate}
        />
        <DeleteModal
          text={text}
          open={openDeleteModal}
          handleDeleteProduct={handleDeleteProduct}
          handleCloseDeleteModal={handleCloseDeleteModal}
        />
      </div>
      <div className="absolute bottom-2 right-2 bg-[#DCE5FF] rounded-lg">
        <List
          sx={{ width: "100%", maxWidth: 260 }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <Collapse in={open2} timeout="auto" unmountOnExit>
            <div className="flex flex-col px-2 gap-1">
              <div className="flex justify-between border-b-2">
                <p>Toplam Adet </p>
                <p>{filteredeData?.quantityTotal}</p>
              </div>
              <div className="flex justify-between border-b-2">
                <p>Ara Toplam</p>
                <p>{filteredeData?.subTotal}</p>
              </div>
              {filteredeData?.kdvTotal1 != 0 ? (
                <div className="flex justify-between border-b-2">
                  <p>KDV %1</p>
                  <p>{filteredeData?.kdvTotal1}</p>
                </div>
              ) : null}
              {filteredeData?.kdvTotal8 != 0 ? (
                <div className="flex justify-between border-b-2">
                  <p>KDV %8</p>
                  <p>{filteredeData?.kdvTotal8}</p>
                </div>
              ) : null}
              {filteredeData?.kdvTotal10 != 0 ? (
                <div className="flex justify-between border-b-2">
                  <p>KDV %10</p>
                  <p>{filteredeData?.kdvTotal10}</p>
                </div>
              ) : null}
              {filteredeData?.kdvTotal18 != 0 ? (
                <div className="flex justify-between border-b-2">
                  <p>KDV %18</p>
                  <p>{filteredeData?.kdvTotal18}</p>
                </div>
              ) : null}
              {filteredeData?.kdvTotal20 != 0 ? (
                <div className="flex justify-between border-b-2">
                  <p>KDV %20</p>
                  <p>{filteredeData?.kdvTotal20}</p>
                </div>
              ) : null}
              <div className="flex justify-between border-b-2">
                <p>KDV Toplam</p>
                <p>{filteredeData?.taxTotal}</p>
              </div>
              <div className="flex justify-between border-b-2">
                <p>Genel Toplam</p>
                <p>{filteredeData?.generalTotal}</p>
              </div>
            </div>
          </Collapse>

          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <InboxIcon width={35} />
            </ListItemIcon>
            <ListItemText primary="Belge Detayları" />
            {open2 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </List>
      </div>
    </div>
  );
};

export default BelgeOluşturma;
