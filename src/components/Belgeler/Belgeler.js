import {
  getAllDocumentsProcess,
  getIncomingProductDetailProcess,
  getIncomingProductsProcess,
  getIncomingTransactionsProcess,
  getOutgoingProductDetailProcess,
  getOutgoingProductsProcess,
} from "@/src/api";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BelgeDetayModal from "./BelgeDetayModal";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { resetIncomingProductDetail } from "@/src/redux/slice/get-incoming-product-detail-slice";
import { resetOutgoingProductDetail } from "@/src/redux/slice/get-outgoing-product-detail-slice";
import add from "../../../public/images/add.png";
import Image from "next/image";
import BelgeSecmeModal from "./BelgeSecmeModal";
import { AppContext } from "@/src/pages/_app";

const columns = [
  {
    id: "ozellik",
    label: "Cari Türü",
    minWidth: 110,
    format: (value) =>
      value === 1 ? "Ürün Giriş Belgesi" : "Ürün Çıkış Belgesi",
    colorFormat: (value) => (value === 1 ? "red" : "green"),
  },
  {
    id: "documentDate",
    label: "Belge Tarihi ",
    minWidth: 100,
  },
  { id: "documentNumber", label: "Belge No", minWidth: 170 },
  {
    id: "description",
    label: "Açıklama",
    minWidth: 100,
  },
];

const tabOptions = [
  { id: "Hepsi", label: "Tüm Belgeler" },
  { id: "Gelen", label: "Ürün Giriş Belgeleri" },
  { id: "Giden", label: "Ürün Çıkış Belgeleri" },
];

function decryptData(encryptedData) {
  const decryptedData = atob(encryptedData);
  return decryptedData;
}

const Belgeler = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [openAddingModal, setOpenAddingModal] = useState(false);
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState("Hepsi");
  const [belgeModal, setBelgeModal] = useState(false);
  const router = useRouter();
  const { searchQuery } = useContext(AppContext);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setBelgeModal(false);
  const handleAddingModalOpen = () => setOpenAddingModal(true);
  const handleAddingModalClose = () => setOpenAddingModal(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    dispatch(getAllDocumentsProcess());
  }, []);

  const handleIncomingProducts = () => {
    dispatch(getIncomingProductsProcess());
    setSelectedTab("Gelen");
  };

  const handleOutgoingProducts = () => {
    dispatch(getOutgoingProductsProcess());
    setSelectedTab("Giden");
  };

  const handleChangeTab = (tabId) => {
    setSelectedTab(tabId);
    // Seçilen tab değiştikçe, ilgili verileri güncelleyin veya filtreleyin.
    if (tabId === "Gelen") {
      handleIncomingProducts();
    } else if (tabId === "Giden") {
      handleOutgoingProducts();
    } else {
      dispatch(getAllDocumentsProcess());
    }
  };

  const allDocuments = useSelector((state) => state.allDocuments.data);
  const incomingProducts = useSelector(
    (state) => state.getIncomingProducts.data
  );
  const outgoingProducts = useSelector(
    (state) => state.getOutgoingProducts.data
  );
  const pageStok = router.query.a1;
  const decryptedPageStok = decryptData(pageStok ? pageStok : null);
  const documentId = router.query.a2;
  const decryptedDocumentId = decryptData(documentId ? documentId : null);

  let filteredData = [];

  useEffect(() => {
    dispatch(getIncomingTransactionsProcess({ _id: decryptedDocumentId }));
  }, [decryptedDocumentId]);

  const listTransactions = useSelector((state) => state.listTransactions.data);

  if (decryptedPageStok == 3) {
    filteredData = listTransactions;
  } else {
    if (selectedTab === "Gelen") {
      filteredData = incomingProducts;
    } else if (selectedTab === "Giden") {
      filteredData = outgoingProducts;
    } else if (selectedTab === "Hepsi") {
      filteredData = allDocuments;
    }
  }

  useEffect(() => {
    if (searchQuery) {
      const filtered = filteredData?.filter((document) =>
        document.documentNumber
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(filteredData);
    }
  }, [searchQuery, filteredData]);

  const handleDocumentDetail = (_id, ozellik) => {
    ozellik == 1
      ? dispatch(getIncomingProductDetailProcess({ incomingProductId: _id }))
      : dispatch(getOutgoingProductDetailProcess({ outgoingProductId: _id }));

    dispatch(resetIncomingProductDetail());
    dispatch(resetOutgoingProductDetail());

    router.push("/stokTakip/belgeDetay");
  };

  return (
    <div className="h-full w-full bg-light rounded-lg md:pr-24 pr-2 lg:pl-16 md:pl-8 pl-2 md:py-8 py-3 flex flex-col   ">
      <div className="w-full flex md:flex-row flex-col md:justify-between items-center md:mb-6 mb-2 ">
        {/* Büyük Ekran */}
        <div className="md:flex hidden">
          <h2 className="lg:text-2xl md:text-xl text-lg font-bold  md:flex hidden justify-center">
            Belgeler
          </h2>
          <div
            className="flex lg:gap-3 md:gap-2 gap-1 bg-blue-900 hover:bg-blue-700 text-white duration-500 py-1 px-2 rounded-lg ml-2 cursor-pointer"
            onClick={() => setBelgeModal(true)}
          >
            <Image
              src={add}
              alt="Ürün Ekle"
              className="cursor-pointer flex justify-center items-center my-auto"
              width={25}
            />
            <h2 className="lg:text-xl md:text-lg text-xs flex justify-center items-center my-auto">
              Yeni Belge Oluştur
            </h2>
          </div>
        </div>

        {decryptedPageStok === "ée" && (
          <div className="md:flex hidden gap-2 mt-2 text-sm">
            {tabOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleChangeTab(option.id)}
                className={`border-2 border-blue-100 px-1 py-1 rounded-lg  ${
                  selectedTab === option.id ? "bg-blue-900 text-white" : ""
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
        {/* Telefon Ekran */}
        <div className="flex md:hidden flex-col">
          <h2 className=" text-3xl font-bold  flex md:hidden justify-center">
            Belgeler
          </h2>
          <button
            className="flex items-center justify-center gap-1 px-1   py-1 rounded-md mt-1 bg-blue-900 hover:bg-blue-700 text-white duration-500"
            onClick={() => setBelgeModal(true)}
          >
            <Image
              src={add}
              alt="Ürün Ekle"
              className="  cursor-pointer"
              width={20}
            />
            <h2 className=" text-xs  font-semibold">Yeni Belge Oluştur</h2>
          </button>
        </div>
        {decryptedPageStok === "ée" && (
          <div className="flex md:hidden gap-2 mt-2 text-xs">
            {tabOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleChangeTab(option.id)}
                className={`border-2 border-blue-100 px-1 py-1 rounded-lg  ${
                  selectedTab === option.id ? "bg-blue-900 text-white" : ""
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Büyük Ekran */}
      <div className="md:flex hidden  ">
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
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts && filteredProducts.length > 0 ? (
                  filteredProducts
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((documentData) => (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={documentData._id}
                        onClick={() =>
                          handleDocumentDetail(
                            documentData._id,
                            documentData.ozellik
                          )
                        }
                        className="cursor-pointer"
                      >
                        {columns.map((column) => {
                          const value = documentData[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.id === "productImage" ? (
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  {documentData.productImage?.data ? (
                                    <div
                                      style={{
                                        maxWidth: "80px",
                                        maxHeight: "100px",
                                      }}
                                    >
                                      {column.render(documentData)}
                                    </div>
                                  ) : (
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
                                  )}
                                </div>
                              ) : column.format && typeof value === "number" ? (
                                <span
                                  style={{
                                    color: column.colorFormat
                                      ? column.colorFormat(value)
                                      : "inherit",
                                  }}
                                >
                                  {column.format(value)}
                                </span>
                              ) : (
                                <span
                                  style={{
                                    color: column.colorFormat
                                      ? column.colorFormat(value)
                                      : "inherit",
                                  }}
                                >
                                  {value}
                                </span>
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} align="center">
                      Aradığınız Belge Kodunda Veri Bulunamadı.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={filteredData ? filteredData.length : 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
      {/* Telefon Ekranı */}
      <div className="flex flex-col md:hidden w-full max-h-[540px] overflow-y-auto">
        {/* Map and display the content here */}
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map((documentData) => (
            <div
              key={documentData._id}
              className="cursor-pointer border-2 border-dark-purple my-1 rounded-lg px-2 py-1 "
              onClick={() => {
                handleDocumentDetail(documentData._id, documentData.ozellik);
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
                    maxHeight: "100px",
                    display: "flex",
                  }}
                >
                  <span
                    className={`font-semibold text-sm ${
                      documentData.ozellik === 1
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {documentData.ozellik === 1
                      ? "Ürün Giriş Belgesi"
                      : "Ürün Çıkış Belgesi"}
                  </span>
                </div>

                {/* Ürün Adı */}

                {/* Adet ve Fiyat */}
                <div className="flex flex-col text-sm ">
                  {documentData.documentNumber && (
                    <p className="font-semibold text-sm flex ">
                      No: {documentData.documentNumber}
                    </p>
                  )}
                </div>
              </div>

              {/* Düzenle ve Sil Düğmeleri */}
              <div className="flex justify-between text-sm mt-2 ">
                {documentData.documentDate && (
                  <p className="font-semibold justify-end items-end text-xs">
                    Tarih: {documentData.documentDate}
                  </p>
                )}
                <div className="text-sm">
                  {documentData.order && (
                    <p className="font-semibold justify-end items-end text-xs">
                      {documentData.ozellik === 1 ? "Satıcı " : "Tedarikçi "}:{" "}
                      {documentData.order.isim}
                    </p>
                  )}
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
      <BelgeSecmeModal open={belgeModal} handleClose={handleClose} />
    </div>
  );
};

export default Belgeler;
