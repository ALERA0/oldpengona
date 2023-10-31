import { useRouter } from "next/router";
import React, { useEffect, useState, Fragment, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import logo2 from "../../../public/images/logo2.png";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  InboxIcon,
} from "@heroicons/react/20/solid";
import { Button, Input } from "antd";
import Image from "next/image";
import BelgeDetayModal from "../../components/Belgeler/BelgeDetayModal";
import {
  addIncomingProductToIncomingProductProcess,
  addIncomingProductToOutgoingProductProcess,
  deleteProductFromIncomingProductProcess,
  deleteProductFromOutgoingProductProcess,
  getIncomingProductDetailProcess,
  getMusteriOrdersProcess,
  getOutgoingProductDetailProcess,
  getTedarikciOrdersProcess,
  updateIncomingDocProcess,
  updateOutgoingDocProcess,
} from "../../api";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  TextareaAutosize,
} from "@mui/material";
import add from "../../../public/images/add.png";
import BelgeyeUrunEklemeModal from "../../components/Belgeler/BelgeyeUrunEklemeModal";
import { resetAddIncomingProductToIncomingProduct } from "../../redux/slice/add-incoming-product-to-incoming-product-slice";
import { resetAddIncomingProduct } from "../../redux/slice/add-incoming-product-slice";
import {
  showToastErrorMessage,
  showToastSuccesMessage,
} from "../../components/ToastComponent";
import { resetAddOutgoingProduct } from "../../redux/slice/add-outgoing-product-slice";
import { resetUpdateIncomingDoc } from "../../redux/slice/update-incoming-doc-slice";
import { resetUpdateOutgoingDoc } from "../../redux/slice/update-outgoing-doc-slice";
import { AppContext } from "../_app";
import { resetIncomingProductDelete } from "../../redux/slice/delete-product-from-incoming-product-slice";
import { resetOutgoingProductDelete } from "../../redux/slice/delete-product-from-outgoing-product-slice";
import { resetIncomingProductQuantityUpdate } from "../../redux/slice/update-incoming-doc-product-quantity-slice";
import { resetOutgoingProductQuantityUpdate } from "../../redux/slice/update-outgoing-doc-product-quantity-slice";
import DeleteModal from "../../components/DeleteModal";
import { resetAddIncomingProductWithProducts } from "@/src/redux/slice/add-incoming-product-with-products-slice";
import { resetAddOutgoingProductWithProducts } from "@/src/redux/slice/add-outgoing-product-with-products-slice";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";

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

// URL den gönderdiğimiz veriyi karmaşık hale getirdik
function encryptData(data) {
  const encryptedData = btoa(data);
  return encryptedData;
}

const belgeDetay = () => {
  const [documentDate, setDocumentDate] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [description, setDescription] = useState("");
  const [order, setOrder] = useState("");
  const [productDetails, setProductDetails] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [selectedProductData, setSelectedProductData] = useState(null);
  const router = useRouter();
  const { searchQuery } = useContext(AppContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [detailOrUpdate, setDetailOrUpdate] = useState(false);
  const [open2, setOpen2] = React.useState(true);

  const handleClick = () => {
    setOpen2(!open2);
  };

  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { data: IncomingProductsDetailData } = useSelector(
    (state) => state?.incomingProductdetail
  );
  const { data: OutgoingProductsDetailData } = useSelector(
    (state) => state?.outgoingProductdetail
  );
  const { status: addIncomingProductStatus } = useSelector(
    (state) => state.addIncomingProduct
  );

  const { status: addOutgoingProductStatus } = useSelector(
    (state) => state.addOutgoingProduct
  );

  const {
    status: productsToOutgoingStatus,
    message: productsToOutgoingAddMessage,
  } = useSelector((state) => state.addOutgoingProductWithProducts);

  const { status: productsToAddStatus, message: productsToAddMessage } =
    useSelector((state) => state.addIncomingProductWithProducts);

  const [isGelen, setIsGelen] = useState(null);
  useEffect(() => {
    if (IncomingProductsDetailData) {
      setIsGelen(true);
    }
    if (OutgoingProductsDetailData) {
      setIsGelen(false);
    }
  }, [IncomingProductsDetailData, OutgoingProductsDetailData]);

  const data = isGelen
    ? IncomingProductsDetailData
    : OutgoingProductsDetailData;

  const documentType = isGelen
    ? "Ürün Giriş Belgesi Detay"
    : "Ürün Çıkış Belgesi Detay";

  const orderType = isGelen ? "Satıcı :" : "Alıcı :";

  useEffect(() => {
    if (data) {
      setDocumentDate(data.documentDate);
      setDocumentNumber(data.documentNumber);
      setDescription(data.description);
      setOrder(data.order);
      if (data.products) {
        const updatedProductDetails = data.products.map((productData) => ({
          ...productData,
          quantity: productData.quantity,
          _id: productData._id,
        }));
        setProductDetails(updatedProductDetails);
      }
    }
  }, [data]);

  const handleDeleteProduct = async () => {
    try {
      await deleteProductFromDocument(selectedProductId);
      handleCloseDeleteModal();
    } catch (error) {
      console.error("Ürün silme işlemi başarısız oldu:", error);
    }
  };

  const deleteProductFromDocument = async (productRowId) => {
    if (isGelen) {
      await dispatch(
        deleteProductFromIncomingProductProcess({
          incomingProductId: data._id,
          productId: productRowId,
        })
      );
    } else {
      await dispatch(
        deleteProductFromOutgoingProductProcess({
          outgoingProductId: data._id,
          productId: productRowId,
        })
      );
    }
    if (isGelen) {
      await dispatch(
        getIncomingProductDetailProcess({ incomingProductId: data?._id })
      );
    } else if (!isGelen) {
      await dispatch(
        getOutgoingProductDetailProcess({ outgoingProductId: data?._id })
      );
    }

    setOpen(false);
  };

  useEffect(() => {
    dispatch(getTedarikciOrdersProcess());
    dispatch(getMusteriOrdersProcess());
  }, []);

  const handleOpenModal = (productData) => {
    setSelectedProductData(productData);
    setOpen(true);
  };

  const musteriOrders = useSelector((state) => state.getMusteriOrders.data);
  const tedarikciOrders = useSelector((state) => state.getTedarikciOrders.data);

  const [selectedOrder, setSelectedOrder] = useState(order?._id);
  const [selectedCariName, setSelectedCariName] = useState(order?.isim);

  const options = isGelen ? tedarikciOrders : musteriOrders;

  useEffect(() => {
    const orderName = order && order.isim ? order.isim : "Satıcı Seç";
    const orderId = order && order._id ? order._id : "";
    setSelectedCariName(orderName);
    setSelectedOrder(orderId);
  }, [order]);

  const handleOrderChange = (value) => {
    setSelectedOrder(value);
    const selectedOrderName = options.find(
      (option) => option._id === value
    )?.isim;
    setSelectedCariName(selectedOrderName);
  };


  const handleUrunEkleBelgeye = () => {
    const encryptedPageStok = isGelen ? encryptData(2) : encryptData(1);
    const encryptedId = encryptData(data._id);

    router.push({
      pathname: "/stokTakip/",
      query: { a1: encryptedPageStok, a2: encryptedId },
    });
  };

  const handleUpdateDocumentDetail = () => {
    isGelen
      ? dispatch(
          updateIncomingDocProcess({
            _id: data._id,
            documentDate,
            documentNumber,
            description,
            order: selectedOrder,
          })
        )
      : dispatch(
          updateOutgoingDocProcess({
            _id: data._id,
            documentDate,
            documentNumber,
            description,
            order: selectedOrder,
          })
        );
  };
  const { status: updateIncomingProductDocStatus } = useSelector(
    (state) => state.updateIncomingProduct
  );

  const { status: updateOutgoingProductDocStatus } = useSelector(
    (state) => state.updateOutgoingProduct
  );

  const { status: removeProductStatus, message: removeProductMessage } =
    useSelector((state) => state.removeProduct);

  const {
    status: removeOutgoingProductStatus,
    message: removeOutgoingProductMessage,
  } = useSelector((state) => state.removeOutgoingProduct);

  const {
    status: updateIncomingProductQuantityStatus,
    message: updateIncomingProductQuantityMessage,
  } = useSelector((state) => state.updateIncomingProductQuantity);

  const {
    status: updateOutgoingProductQuantityStatus,
    message: updateOutgoingProductQuantityMessage,
  } = useSelector((state) => state.updateOutgoingProductQuantity);

  useEffect(() => {
    if (searchQuery) {
      const filtered = productDetails?.filter((document) =>
        document.productName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(productDetails);
    }
  }, [searchQuery, productDetails]);

  useEffect(() => {
    if (productsToAddStatus === "success") {
      showToastSuccesMessage(productsToAddMessage);
      dispatch(resetAddIncomingProductWithProducts());
    }
    if (productsToOutgoingStatus === "success") {
      showToastSuccesMessage(productsToOutgoingAddMessage);
      dispatch(resetAddOutgoingProductWithProducts());
    }
    if (updateIncomingProductDocStatus === "success") {
      dispatch(resetUpdateIncomingDoc());
    } else if (updateIncomingProductDocStatus === "error") {
      dispatch(resetUpdateIncomingDoc());
    }
    if (updateOutgoingProductDocStatus === "success") {
      showToastSuccesMessage("Belge Güncellendi");
      dispatch(resetUpdateOutgoingDoc());
    } else if (updateOutgoingProductDocStatus === "error") {
      showToastErrorMessage("Belge Güncellenemedi");
      dispatch(resetUpdateOutgoingDoc());
    }
    if (removeProductStatus === "success") {
      showToastSuccesMessage(removeProductMessage);
      dispatch(resetIncomingProductDelete());
    } else if (removeProductStatus === "error") {
      showToastErrorMessage(removeProductMessage);
      dispatch(resetIncomingProductDelete());
    }
    if (removeOutgoingProductStatus === "success") {
      showToastSuccesMessage(removeOutgoingProductMessage);
      dispatch(resetOutgoingProductDelete());
    } else if (removeOutgoingProductStatus === "error") {
      showToastErrorMessage(removeOutgoingProductMessage);
      dispatch(resetOutgoingProductDelete());
    }
    if (updateIncomingProductQuantityStatus === "success") {
      showToastSuccesMessage(updateIncomingProductQuantityMessage);
      dispatch(resetIncomingProductQuantityUpdate());
    } else if (updateIncomingProductQuantityStatus === "error") {
      showToastErrorMessage(updateIncomingProductQuantityMessage);
      dispatch(resetIncomingProductQuantityUpdate());
    }
    if (updateOutgoingProductQuantityStatus === "success") {
      showToastSuccesMessage(updateOutgoingProductQuantityMessage);
      dispatch(resetOutgoingProductQuantityUpdate());
    } else if (updateOutgoingProductQuantityStatus === "error") {
      showToastErrorMessage(updateOutgoingProductQuantityMessage);
      dispatch(resetOutgoingProductQuantityUpdate());
    }
  }, [
    productsToAddStatus,
    productsToOutgoingStatus,
    updateIncomingProductDocStatus,
    updateOutgoingProductDocStatus,
    removeProductStatus,
    removeOutgoingProductStatus,
    updateIncomingProductQuantityStatus,
    updateOutgoingProductQuantityStatus,
  ]);

  return (
    <div className="h-full w-full bg-light rounded-lg px-2   md:py-8  flex flex-col  ">
      <div className="w-full flex md:flex-row flex-col ">
        {/* Büyük Ekran */}
        <h2 className="text-2xl md:flex hidden font-bold text-center justify-center items-center w-full">
          {documentType}
        </h2>
        {/* Küçük Ekran */}
        <p className="  text-lg font-bold mb-2 flex md:hidden justify-center items-center mx-auto">
          {documentType}
        </p>
        <Button
          type="primary"
          className=" mx-auto bg-blue-900 mb-2"
          onClick={handleUpdateDocumentDetail}
        >
          Kaydet
        </Button>
      </div>

      <div className="w-full ">
        {data && (
          <div className="w-full flex flex-col md:gap-6 gap-1 ">
            <div className=" w-full md:flex hidden justify-around ">
              {/* Büyük Ekran */}
              <div className="flex gap-2">
                <p className="text-xl font-bold my-auto">Belge Tarihi : </p>
                <Input
                  value={documentDate}
                  className="w-40 text-center my-auto"
                  type="Date"
                  onChange={(e) => setDocumentDate(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <p className="text-xl font-bold my-auto">Belge No : </p>
                <Input
                  value={documentNumber}
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
                <Input
                  value={documentDate}
                  className="w-3/5 h-7 text-center my-auto"
                  type="Date"
                  onChange={(e) => setDocumentDate(e.target.value)}
                />
              </div>
              <div className="flex w-full justify-center items-center gap-2 mt-1">
                <p className="w-2/5 text-end text-sm font-bold my-auto">
                  Belge No :{" "}
                </p>
                <Input
                  value={documentNumber}
                  className="w-3/5 h-7 text-center my-auto"
                  readOnly
                  // onChange={(e) => setDocumentNumber(e.target.value)}
                />
              </div>
            </div>
            {/* Büyük Ekran */}
            <div className="md:flex hidden w-full justify-around  ">
              <div className="flex gap-2">
                <p className="text-xl font-bold my-auto">{orderType} </p>
                <div className="relative z-10 w-44">
                  <Listbox value={selectedOrder} onChange={handleOrderChange}>
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">
                          {selectedCariName}
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
                  className="w-52 h-8 px-1 rounded-lg  my-auto text-black text-sm bg-blue-gray-100"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            {/* Küçük Ekran */}
            <div className=" w-full flex md:hidden flex-col justify-between items-center mx-auto  mb-4 ">
              <div className="flex gap-2 w-full">
                <p className="w-2/5 text-end text-sm font-bold my-auto">
                  {orderType}
                </p>
                <div className="w-3/5 h-7 text-center my-auto flex pr-3 ">
                  <Listbox value={selectedOrder} onChange={handleOrderChange}>
                    <div className="relative mt-1 w-full">
                      <Listbox.Button className="relative w-full   h-7 cursor-default rounded-lg bg-white  pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">
                          {selectedCariName}
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
            </div>
            <div className="w-full bg-gray-600 h-1 rounded-full " />

            <div className="flex md:justify-end justify-center   ">
              <div
                className="flex justify-end items-end  bg-blue-900 hover:bg-blue-700 lg:gap-3 md:gap-2 gap-1 text-white duration-500 py-1 px-2 rounded-lg cursor-pointer"
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
            {/* Büyük Ekran */}
            <div className="md:flex hidden">
              <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer sx={{ maxHeight: 420 }}>
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

                    {filteredProducts && filteredProducts.length > 0 ? (
                      filteredProducts.map((productData) => (
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
                                      setSelectedProductId(
                                        productData._id
                                      );
                                      handleOpenDeleteModal();
                                      // setIptal(false);
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
                  count={productDetails?.length}
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
              {filteredProducts && filteredProducts.length > 0 ? (
                filteredProducts.map((productData) => (
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
                        <button
                          className="px-1 bg-blue-700 rounded-lg text-white py-1 text-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenModal(productData);
                            setDetailOrUpdate(true);
                          }}
                        >
                          Düzenle
                        </button>
                        <button
                          className="px-3 bg-red-700 rounded-lg text-white py-1 text-sm"
                          variant="outlined"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProductId(productData._id);
                            handleOpenDeleteModal();
                          }}
                        >
                          Sil
                        </button>
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
        )}
        <BelgeDetayModal
          data={data}
          open={open}
          handleClose={handleClose}
          productData={selectedProductData}
          isGelen={isGelen}
          detailOrUpdate={detailOrUpdate}
        />
        <DeleteModal
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
                <p>{data?.quantityTotal}</p>
              </div>
              <div className="flex justify-between border-b-2">
                <p>Ara Toplam</p>
                <p>{data?.subTotal}</p>
              </div>
              {data?.kdvTotal1 != 0 ? (
                <div className="flex justify-between border-b-2">
                  <p>KDV %1</p>
                  <p>{data?.kdvTotal1}</p>
                </div>
              ) : null}
              {data?.kdvTotal8 != 0 ? (
                <div className="flex justify-between border-b-2">
                  <p>KDV %8</p>
                  <p>{data?.kdvTotal8}</p>
                </div>
              ) : null}
              {data?.kdvTotal10 != 0 ? (
                <div className="flex justify-between border-b-2">
                  <p>KDV %10</p>
                  <p>{data?.kdvTotal10}</p>
                </div>
              ) : null}
              {data?.kdvTotal18 != 0 ? (
                <div className="flex justify-between border-b-2">
                  <p>KDV %18</p>
                  <p>{data?.kdvTotal18}</p>
                </div>
              ) : null}
              {data?.kdvTotal20 != 0 ? (
                <div className="flex justify-between border-b-2">
                  <p>KDV %20</p>
                  <p>{data?.kdvTotal20}</p>
                </div>
              ) : null}
              <div className="flex justify-between border-b-2">
                <p>KDV Toplam</p>
                <p>{data?.taxTotal}</p>
              </div>
              <div className="flex justify-between border-b-2">
                <p>Genel Toplam</p>
                <p>{data?.generalTotal}</p>
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

export default belgeDetay;
