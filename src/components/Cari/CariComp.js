import React, { useContext, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import add from "../../../public/images/add.png";
import { useSelector, useDispatch } from "react-redux";
import {
  addNewOrderProcess,
  deleteOrderProcess,
  getAllOrdersProcess,
  getMusteriOrdersProcess,
  getOrderDetailProcess,
  getTedarikciOrdersProcess,
} from "@/src/api";
import { Button } from "@mui/material";
import Image from "next/image";
import CariAddingModal from "./CariAddingModal";
import CariDetayModal from "./CariDetayModal";
import { resetAllProducts } from "@/src/redux/slice/get-all-products-slice";
import { useEffect } from "react";
import { resetAddOrder } from "@/src/redux/slice/add-new-order-slice";
import {
  showToastErrorMessage,
  showToastSuccesMessage,
} from "../ToastComponent";
import { resetUpdateOrder } from "@/src/redux/slice/update-order-slice";
import { resetDeleteOrder } from "@/src/redux/slice/delete-order-slice";
import { AppContext } from "@/src/pages/_app";
import DeleteModal from "../DeleteModal";

const columns = [
  {
    id: "isim",
    label: "Cari İsmi",
    minWidth: 100,
  },
  { id: "email", label: "Ürün Kodu", minWidth: 170 },
  {
    id: "telefon",
    label: "Telefon",
    minWidth: 100,
  },
  {
    id: "ozellik",
    label: "Cari Türü",
    minWidth: 110,
  },
  {
    id: "actions",
    label: "İşlemler",
    minWidth: 50,
  },
];

const tabOptions = [
  { id: "Hepsi", label: "Hepsi" },
  { id: "Musteri", label: "Müşteri" },
  { id: "Tedarikci", label: "Tedarikçi" },
  // Daha fazla seçenek ekleyebilirsiniz...
];

const CariComp = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [openAddingModal, setOpenAddingModal] = useState(false);
  const dispatch = useDispatch();
  const [detailOrUpdate, setDetailOrUpdate] = useState(false);
  const { searchQuery } = useContext(AppContext);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleDeleteProduct = async () => {
    try {
      await deleteOrder(selectedProductId);
      await dispatch(getAllOrdersProcess());
      handleCloseDeleteModal();
    } catch (error) {
      console.error("Ürün silme işlemi başarısız oldu:", error);
    }
  };

  const deleteOrder = async (_id) => {
    try {
      await dispatch(deleteOrderProcess({ _id }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleOrderDetail = (_id) => {
    dispatch(getOrderDetailProcess({ _id }));
  };

  const { data: OrderDetail } = useSelector((state) => state.orderDetail);
  const { data: GetMusteriOrders } = useSelector(
    (state) => state.getMusteriOrders
  );
  const { data: GetTedarikciOrders } = useSelector(
    (state) => state.getTedarikciOrders
  );

  useEffect(() => {
    dispatch(getAllOrdersProcess());
    return () => {
      dispatch(resetAllProducts());
    };
  }, []);

  const handleMusteriOrders = async () => {
    try {
      await dispatch(getMusteriOrdersProcess());
      setSelectedTab("Musteri");
    } catch (error) {
      console.log(error);
    }
  };

  const handleTedarikciOrders = async () => {
    try {
      await dispatch(getTedarikciOrdersProcess());
      setSelectedTab("Tedarikci");
    } catch (error) {
      console.log(error);
    }
  };

  const { data: AllOrderData } = useSelector((state) => state.getAllOrders);

  const [tcNumber, setTcNumber] = useState();
  const [isim, setIsim] = useState("");
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState();
  const [adres, setAdres] = useState("");
  const [ozellik, setOzellik] = useState("Tedarikçi");
  const [isSelected1, setSelection1] = useState(false);
  const [isSelected2, setSelection2] = useState(false);
  const [il, setIl] = useState("");
  const [ilce, setIlce] = useState("");

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleCloseDeleteModal = () => setOpenDeleteModal(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleIsimChange = (e) => setIsim(e.target.value);
  const handleTcNumberChange = (e) => setTcNumber(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleTelefonChange = (e) => setTelefon(e.target.value);
  const handleAdresChange = (e) => setAdres(e.target.value);
  const handleOzellikChange = (e) => setOzellik(e.target.value);
  const handleIlChange = (e) => setIl(e.target.value);
  const handleIlceChange = (e) => setIlce(e.target.value);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAddingModalOpen = () => setOpenAddingModal(true);
  const handleAddingModalClose = () => {
    setOpenAddingModal(false);
    setTcNumber();
    setIsim("");
    setEmail("");
    setTelefon();
    setAdres("");
    setIl("");
    setIlce("");
  };

  let ozellikValue = [];

  if (isSelected1) {
    ozellikValue.push("Tedarikçi");
  }

  if (isSelected2) {
    ozellikValue.push("Müşteri");
  }

  const handleCityChange = (city) => {
    setIl(city);
  };

  const addNewOrder = async () => {
    await dispatch(
      addNewOrderProcess({
        tcNumber: tcNumber,
        isim: isim,
        email: email,
        telefon: telefon,
        adres: adres,
        ozellik: ozellikValue,
        il: il,
        ilce: ilce,
      })
    );

    await dispatch(getAllOrdersProcess());

  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [selectedTab, setSelectedTab] = useState("Hepsi");

  const handleChangeTab = (tabId) => {
    setSelectedTab(tabId);
    // Seçilen tab değiştikçe, ilgili verileri güncelleyin veya filtreleyin.
    if (tabId === "Musteri") {
      handleMusteriOrders();
    } else if (tabId === "Tedarikci") {
      handleTedarikciOrders();
    } else {
      dispatch(getAllOrdersProcess());
    }
  };

  // Örnek tablo verileri:
  const allOrders = useSelector((state) => state.getAllOrders.data);
  const musteriOrders = useSelector((state) => state.getMusteriOrders.data);
  const tedarikciOrders = useSelector((state) => state.getTedarikciOrders.data);
  const { status: newOrderStatus,message:newOrderMessage  } = useSelector((state) => state.newOrder);
  const { status: updateOrderStatus, message: updateOrderMessage } =
    useSelector((state) => state.updateOrder);
  deleteOrder;
  const { status: deleteOrderStatus } = useSelector(
    (state) => state.deleteOrder
  );
  // Hangi tab seçiliyse, ona göre verileri filtrele:
  let filteredData = [];
  if (selectedTab === "Musteri") {
    filteredData = musteriOrders;
  } else if (selectedTab === "Tedarikci") {
    filteredData = tedarikciOrders;
  } else {
    filteredData = allOrders;
  }

  useEffect(() => {
    if (searchQuery) {
      const filtered = filteredData?.filter((order) =>
        order.isim.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(filteredData);
    }
  }, [searchQuery, filteredData]);

  useEffect(() => {
    if (newOrderStatus === "success") {
      showToastSuccesMessage(newOrderMessage);
      handleAddingModalClose();
      dispatch(resetAddOrder());
    } else if (newOrderStatus === "error") {
      showToastErrorMessage(newOrderMessage);
      dispatch(resetAddOrder());
    }
    if (updateOrderStatus === "success") {
      showToastSuccesMessage(updateOrderMessage);
      dispatch(resetUpdateOrder());
    } else if (updateOrderStatus === "error") {
      showToastErrorMessage(updateOrderMessage);
      dispatch(resetUpdateOrder());
    }
    if (deleteOrderStatus.deleteOrderProcess === "success") {
      showToastSuccesMessage("Cari Silindi");
      dispatch(resetDeleteOrder());
    } else if (deleteOrderStatus.deleteOrderProcess === "error") {
      showToastErrorMessage("Cari Silinemedi");
      dispatch(resetDeleteOrder());
    }
  }, [newOrderStatus, updateOrderStatus, deleteOrderStatus.deleteOrderProcess]);

  return (
    <div className="h-full w-full bg-light rounded-lg md:pr-24 pr-2 lg:pl-16 md:pl-8 pl-2 md:py-8 py-3 flex flex-col   ">
      <div className="w-full flex md:flex-row flex-col md:justify-between items-center md:mb-6 mb-2 ">
        {/* Büyük Ekran */}
        <h2 className="lg:text-2xl md:text-xl text-lg font-bold  md:flex hidden justify-center">
          Cariler
        </h2>
        <div className="md:flex hidden gap-2">
          {tabOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleChangeTab(option.id)}
              className={`border px-4 py-2 rounded-lg hover:bg-blue-100 duration-200 ${
                selectedTab === option.id ? "bg-blue-900 text-white" : ""
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        {/* Telefon Ekran */}
        <h2 className="text-3xl mx-auto font-bold md:hidden flex">Cariler</h2>
        {/* Büyük Ekran */}
        <div className="md:flex hidden gap-6">
          <button
            className="flex lg:gap-3 md:gap-2 gap-1 px-2 py-1 rounded-md bg-blue-900 hover:bg-blue-700 text-white duration-500"
            onClick={handleAddingModalOpen}
          >
            <h2 className="lg:text-xl md:text-lg text-xs">Yeni Cari Oluştur</h2>
            <Image
              src={add}
              alt="Cari Ekle"
              className="cursor-pointer"
              width={30}
            />
          </button>
        </div>

        {/* Telefon Ekran */}
        <div className="md:hidden flex gap-2">
          <button
            className="flex  gap-1 px-1 py-1 rounded-md mt-1 bg-blue-900 hover:bg-blue-700 text-white duration-500"
            onClick={handleAddingModalOpen}
          >
            <Image
              src={add}
              alt="Ürün Ekle"
              className="cursor-pointer m-auto"
              width={20}
            />
            <h2 className=" text-xs my-auto font-semibold">
              Yeni Cari Oluştur
            </h2>
          </button>
        </div>
        <div className="flex md:hidden gap-2 mt-2">
          {tabOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleChangeTab(option.id)}
              className={`border px-4 py-2 rounded-lg hover:bg-blue-100 focus:bg-blue-900 duration-200 ${
                selectedTab === option.id ? "bg-blue-900 text-white" : ""
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
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
                    .map((orderData) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={orderData._id}
                          onClick={() => {
                            handleOrderDetail(orderData._id);
                            setOpen(true);
                            setDetailOrUpdate(false);
                          }}
                          className="cursor-pointer"
                        >
                          {columns.map((column) => {
                            const value = orderData[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.id === "ozellik" ? (
                                  <div>
                                    {value.includes("Tedarikçi") &&
                                    value.includes("Müşteri")
                                      ? "Tedarikçi - Müşteri"
                                      : value.join(" - ")}
                                  </div>
                                ) : column.id === "actions" ? (
                                  <div className="flex relative justify-start items-center gap-2 ">
                                    <Button
                                      variant="text"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleOrderDetail(orderData._id);
                                        setDetailOrUpdate(true);
                                        setOpen(true);
                                      }}
                                    >
                                      Düzenle
                                    </Button>
                                    <Button
                                      variant="outlined"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedProductId(orderData._id);
                                        handleOpenDeleteModal();
                                      }}
                                    >
                                      Sil
                                    </Button>
                                  </div>
                                ) : column.format &&
                                  typeof value === "number" ? (
                                  column.format(value)
                                ) : (
                                  value
                                )}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} align="center">
                      Aradığınız cari bulunamadı.
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
          filteredProducts.map((orderData) => (
            <div
              key={orderData._id}
              className="cursor-pointer border-2 border-dark-purple my-1 rounded-lg px-2 py-1 "
              onClick={() => {
                handleOrderDetail(orderData._id);
                setOpen(true);
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
                    maxWidth: "80px",
                    maxHeight: "100px",
                    display: "flex",
                  }}
                >
                  <span className="m-auto font-semibold">{orderData.isim}</span>
                </div>

                {/* Ürün Adı */}

                {/* Adet ve Fiyat */}
                <div className="flex flex-col text-xs font-semibold ">
                  {orderData.ozellik.includes("Tedarikçi") &&
                  orderData.ozellik.includes("Müşteri")
                    ? "Tedarikçi - Müşteri"
                    : orderData.ozellik.join(" - ")}
                </div>
              </div>

              {/* Düzenle ve Sil Düğmeleri */}
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <p className="text-xs  mt-1">Email :{orderData.email}</p>
                  {orderData.telefon && (
                    <p className=" text-xs">Telefon : {orderData.telefon}</p>
                  )}
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "8px",
                  }}
                  className="gap-3"
                >
                  <button
                    className="px-1 bg-blue-700 rounded-lg text-white py-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOrderDetail(orderData._id);
                      setDetailOrUpdate(true);
                      setOpen(true);
                    }}
                  >
                    Düzenle
                  </button>
                  <button
                    className="px-3 bg-red-700 rounded-lg text-white py-1"
                    variant="outlined"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProductId(orderData._id);
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
              Aradığınız isimde cari bulunamadı.
            </div>
          </div>
        )}
      </div>

      <CariDetayModal
        open={open}
        handleClose={handleClose}
        OrderDetail={OrderDetail}
        detailOrUpdate={detailOrUpdate}
        isSelected1={isSelected1}
        setSelection1={setSelection1}
        isSelected2={isSelected2}
        setSelection2={setSelection2}
      />
      <CariAddingModal
        openAddingModal={openAddingModal}
        handleCloseAddingModal={handleAddingModalClose}
        addNewOrder={addNewOrder}
        onFinishFailed={onFinishFailed}
        tcNumber={tcNumber}
        isim={isim}
        email={email}
        telefon={telefon}
        adres={adres}
        ozellik={ozellik}
        handleIsimChange={handleIsimChange}
        handleTcNumberChange={handleTcNumberChange}
        handleEmailChange={handleEmailChange}
        handleTelefonChange={handleTelefonChange}
        handleAdresChange={handleAdresChange}
        handleOzellikChange={handleOzellikChange}
        isSelected1={isSelected1}
        setSelection1={setSelection1}
        isSelected2={isSelected2}
        setSelection2={setSelection2}
        il={il}
        ilce={ilce}
        handleIlChange={handleIlChange}
        handleIlceChange={handleIlceChange}
        handleCityChange={handleCityChange}
      />
      <DeleteModal
        open={openDeleteModal}
        handleDeleteProduct={handleDeleteProduct}
        handleCloseDeleteModal={handleCloseDeleteModal}
      />
    </div>
  );
};

export default CariComp;
