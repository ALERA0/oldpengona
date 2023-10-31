import React, { useContext, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import ModalComponent from "./ModalComponent";
import { useSelector, useDispatch } from "react-redux";
import {
  addNewCategoryProcess,
  addNewProductProcess,
  getAllCategoriesProcess,
  getAllProductsProcess,
  getProductDetailProcess,
  getProductsByCategoryProcess,
  productDeleteProcess,
  updateProductProcess,
} from "@/src/api";
import logo2 from "../../../../public/images/logo2.png";
import add from "../../../../public/images/add.png";

import Image from "next/image";
import { Button } from "@mui/material";
import AddingModal from "./AddingModal/AddingModal";
import { resetAllProducts } from "@/src/redux/slice/get-all-products-slice";
import { useRouter } from "next/router";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import BelgeyeUrunEklemeModal from "../../Belgeler/BelgeyeUrunEklemeModal";
import { resetAddProduct } from "@/src/redux/slice/add-new-product-slice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetProductDelete } from "@/src/redux/slice/delete-product-from-incoming-product-slice";
import { resetDeleteProduct } from "@/src/redux/slice/delete-product-slice";
import {
  showToastErrorMessage,
  showToastSuccesMessage,
} from "../../ToastComponent";
import { resetUpdateProduct } from "@/src/redux/slice/update-product-slice";
import { resetAddIncomingProductToIncomingProduct } from "@/src/redux/slice/add-incoming-product-to-incoming-product-slice";
import { resetAddIncomingProductToOutgoingProduct } from "@/src/redux/slice/add-incoming-product-to-outgoing-product-slice";
import { AppContext } from "@/src/pages/_app";
import DeleteModal from "../../DeleteModal";
import { Carousel } from "antd";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import NewCategoryModal from "./NewCategoryModal";
import editIcon from "../../../../public/images/edit.png";
import EditcategoryModal from "./EditcategoryModal";
import Resizer from "react-image-file-resizer";
import { resetAddIncomingProductToVirtualDoc } from "@/src/redux/slice/add-product-to-incoming-virtual-doc-slice";
import { resetAddProductToOutgoingVirtualDoc } from "@/src/redux/slice/add-product-to-outgoing-virtual-doc-slice";

const columns = [
  {
    id: "productImage",
    label: "",
    render: (item) => {
      return (
        <img src={item.productImage} alt="Ürün Resmi" className="max-h-16" />
      );
    },
    minWidth: 200,
  },

  { id: "productCode", label: "Ürün Kodu", minWidth: 170 },
  {
    id: "productQuantity",
    label: "Miktar",
    minWidth: 100,
  },
  {
    id: "productListPrice",
    label: "Fiyat",
    minWidth: 110,
  },
  {
    id: "actions",
    label: "İşlemler",
    minWidth: 200,
  },

  // Diğer sütunlar...
];

function decryptData(encryptedData) {
  const decryptedData = atob(encryptedData);
  return decryptedData;
}

const Stok = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [openBelgedenGelenModal, setOpenBelgedenGelenModal] =
    React.useState(false);

  const [openAddingModal, setOpenAddingModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);

  const { data: ProductDetail } = useSelector((state) => state.productDetail);
  const { status, message: addNewProductMessage } = useSelector(
    (state) => state.addNewProduct
  );

  const [productName, setProductName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [categorySelect, setCategorySelect] = useState("");
  const [categoryEdit, setCategoryEdit] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [productQuantity, setProductQuantity] = useState("");
  const [productListPrice, setProductListPrice] = useState("");
  const [productPackageType, setProductPackageType] = useState("");
  const [productBarcode, setProductBarcode] = useState("");
  const [productAddress, setProductAddress] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [detailOrUpdate, setDetailOrUpdate] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [belgeyeDon, setBelgeyeDon] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [category, setCategory] = useState(null);
  const [categoryAddModal, setCategoryAddModal] = useState(false);
  const [categoryEditModal, setCategoryEditModal] = useState(false);
  const [birim, setBirim] = useState("");

  const handleCityChange = (city) => {
    setBirim(city);
  };

  // Yeni ürün bilgilerini state'lerle güncellemek için handleChange fonksiyonları
  const handleProductNameChange = (e) => setProductName(e.target.value);
  const handleProductCodeChange = (e) => setProductCode(e.target.value);
  const handleProductQuantityChange = (e) => setProductQuantity(e.target.value);
  const handleProductPriceChange = (e) => setProductListPrice(e.target.value);
  const handleProductPackageTypeChange = (e) =>
    setProductPackageType(e.target.value);
  const handleProductBarcodeChange = (e) => setProductBarcode(e.target.value);
  const handleProductAddressChange = (e) => setProductAddress(e.target.value);
  const handleProductDescriptionChange = (e) =>
    setProductDescription(e.target.value);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);
  const handleClose = () => setOpen(false);
  const handleCloseBelgedenGelenModalOpen = () =>
    setOpenBelgedenGelenModal(false);
  const handleOpenCategoryAddModal = () => setCategoryAddModal(true);
  const handleCloseCategoryAddModal = () => {
    setCategoryAddModal(false);
    setCategorySelect("");
  };
  const handleOpenCategoryEditModal = () => setCategoryEditModal(true);
  const handleCloseCategoryEditModal = () => {
    setCategoryEditModal(false);
    setCategoryEdit("");
  };

  const handleAddingModalOpen = () => setOpenAddingModal(true);
  const handleAddingModalClose = () => {
    setProductName("");
    setProductCode("");
    setProductQuantity("");
    setProductListPrice("");
    setProductPackageType("");
    setProductBarcode("");
    setProductAddress("");
    setProductDescription("");
    setOpenAddingModal(false);
    setCategory(null);
    setBirim("");
  };
  const dispatch = useDispatch();
  const router = useRouter();

  const handleProductImageChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];

      // Define the maximum dimensions and quality for the resized image
      const maxWidth = 800;
      const maxHeight = 800;
      const quality = 50; // You can adjust the quality as needed

      // Resize and compress the image
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

  const pageStok = router.query.a1;
  const documentId = router.query.a2;
  const decryptedPageStok = decryptData(pageStok ? pageStok : null);
  const decryptedDocumentId = decryptData(documentId ? documentId : null);
  const { searchQuery } = useContext(AppContext);

  const { data: AllProductData } = useSelector((state) => state.getAllProducts);
  const { status: DeleteProductStatus } = useSelector(
    (state) => state.productDelete
  );
  const { status: updateProductStatus } = useSelector(
    (state) => state.updateProduct
  );

  const { status: addProductToIncomingProductStatus } = useSelector(
    (state) => state.addProductToIncomingProduct
  );

  const { status: addProductToOutgoingProductStatus } = useSelector(
    (state) => state.addProductToOutgoingProduct
  );

  const { data: getProductsByCategoryData } = useSelector(
    (state) => state.getProductsByCategory
  );

  const {
    status: addProductToOutgoingVirtualDocStatus,
    message: addProductToOutgoingVirtualDocMessage,
  } = useSelector((state) => state.addProductToOutgoingVirtualDoc);
  const {
    status: addProductToIncomingVirtualDocStatus,
    message: addProductToIncomingVirtualDocMessage,
  } = useSelector((state) => state.addProductToIncomingVirtualDoc);

  const handleBelgeDetay = () => {
    if (decryptedDocumentId !== "ée") {
      router.push("/stokTakip/belgeDetay");
    } else if (decryptedPageStok == 2) {
      router.push("/stokTakip/urunGiris");
    } else if (decryptedPageStok == 1) {
      router.push("/stokTakip/urunCikis");
    }
  };

  useEffect(() => {
    if (decryptedPageStok == 1 || decryptedPageStok == 2) {
      setBelgeyeDon(true);
    } else {
      setBelgeyeDon(false);
    }
  }, [decryptedPageStok]);

  const handleProductDetail = (_id) => {
    dispatch(getProductDetailProcess({ _id }));
    if (decryptedPageStok == 1 || decryptedPageStok == 2) {
      setOpenBelgedenGelenModal(true);
    } else {
      setOpen(true);
    }
  };
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

    // Eğer "Tüm Ürünler" seçeneği seçildiyse, "category" değerini null olarak ayarlayın
    if (categoryId === null) {
      setCategory(null);
    }
  };

  const addNewProduct = async () => {
    await dispatch(
      addNewProductProcess({
        productCode: productCode,
        productName: productName,
        productListPrice: productListPrice,
        productQuantity: productQuantity,
        productImage: productImage,
        productDescription: productDescription,
        productPackageType: birim,
        productBarcode: productBarcode,
        productAddress: productAddress,
        category: category,
      })
    );
    await dispatch(getAllProductsProcess());
  };

  useEffect(() => {
    dispatch(getProductsByCategoryProcess({ categoryId: selectedCategoryId }));
  }, [selectedCategoryName]);

  useEffect(() => {
    if (status === "success") {
      showToastSuccesMessage(addNewProductMessage);
      handleAddingModalClose();
      dispatch(resetAddProduct());
    } else if (status === "error") {
      showToastErrorMessage(addNewProductMessage);
      dispatch(resetAddProduct());
    }
    if (DeleteProductStatus.productDeleteProcess === "success") {
      showToastSuccesMessage("Ürün Silindi");
      dispatch(resetDeleteProduct());
    } else if (DeleteProductStatus.productDeleteProcess === "error") {
      showToastErrorMessage("Ürün Silinemedi");
      dispatch(resetDeleteProduct());
    }
    if (updateProductStatus === "success") {
      showToastSuccesMessage("Ürün Güncellendi");
      dispatch(resetUpdateProduct());
    } else if (updateProductStatus === "error") {
      showToastErrorMessage("Ürün Güncellenemedi");
      dispatch(resetUpdateProduct());
    }
  }, [
    status,
    DeleteProductStatus.productDeleteProcess,
    updateProductStatus,
    addProductToIncomingProductStatus,
    addProductToOutgoingProductStatus,
    addProductToIncomingVirtualDocStatus,
    addProductToOutgoingVirtualDocStatus,
  ]);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const addNewCategory = async () => {
    await dispatch(
      addNewCategoryProcess({
        categoryName: categorySelect,
      })
    );
    await dispatch(getAllCategoriesProcess());

    handleCloseCategoryAddModal();
    setCategorySelect("");
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { data: getAllCategoriesData } = useSelector(
    (state) => state.getAllCategories
  );

  useEffect(() => {
    dispatch(getAllProductsProcess());
    dispatch(getAllCategoriesProcess());
    return () => {
      dispatch(resetAllProducts());
    };
  }, []);

  const handleDeleteProduct = async () => {
    try {
      await deleteProduct(selectedProductId);
      await dispatch(getAllProductsProcess());
      handleCloseDeleteModal();
    } catch (error) {
      console.error("Ürün silme işlemi başarısız oldu:", error);
    }
  };

  const deleteProduct = async (_id) => {
    try {
      await dispatch(productDeleteProcess({ _id }));
    } catch (error) {
      console.log(error);
    }
  };

  let filteredData = [];
  if (selectedCategoryId) {
    filteredData = getProductsByCategoryData;
  } else {
    filteredData = AllProductData;
  }

  useEffect(() => {
    if (searchQuery) {
      const filtered = filteredData?.filter((product) =>
        product.productName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(filteredData);
    }
  }, [searchQuery, filteredData]);

  return (
    <div className="h-full w-full bg-light rounded-lg md:pr-24 pr-2 lg:pl-16 md:pl-8 pl-2 md:py-8 py-3 flex flex-col   ">
      <div className="w-full flex md:flex-row flex-col md:justify-between items-center md:mb-6 mb-2 ">
        {/* Büyük Ekran */}
        <h2 className="lg:text-2xl md:text-xl text-lg font-bold  md:flex hidden justify-center">
          Ürün Stoğu
        </h2>
        {/* Telefon Ekran */}
        <h2 className="text-3xl mx-auto font-bold md:hidden flex">
          Ürün Stoğu
        </h2>
        {/* Büyük Ekran */}
        <div className="md:flex hidden gap-6">
          {belgeyeDon ? (
            <button
              className="bg-green-800 text-white hover:bg-green-900 duration-300 hover:shadow-lg px-2"
              onClick={handleBelgeDetay}
            >
              Belge Detayına Dön
            </button>
          ) : null}
          <button
            className="flex lg:gap-3 md:gap-2 gap-1 px-2 py-1 rounded-md bg-blue-900 hover:bg-blue-700 text-white duration-500"
            onClick={handleAddingModalOpen}
          >
            <h2 className="lg:text-xl md:text-lg text-xs">Yeni Ürün Oluştur</h2>
            <Image
              src={add}
              alt="Ürün Ekle"
              className="cursor-pointer"
              width={30}
            />
          </button>
        </div>
        {/* Telefon Ekran */}
        <div className="md:hidden flex gap-2">
          {belgeyeDon ? (
            <button
              className="bg-green-800 text-white hover:bg-green-900 duration-300 hover:shadow-lg px-1 text-sm"
              onClick={handleBelgeDetay}
            >
              Belge Detayına Dön
            </button>
          ) : null}
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
              Yeni Ürün Oluştur
            </h2>
          </button>
        </div>
      </div>
      {/* Büyük Ekran */}
      <div className="md:flex hidden w-full mb-3 z-10 gap-2">
        <p className="w-1/8 text-center flex my-auto font-bold justify-end items-start">
          Kategori Seç
        </p>
        <Listbox value={category} onChange={handleCategoryChange}>
          <div className="relative mt-1 w-4/6">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate text-black ">
                {selectedCategoryName ? (
                  selectedCategoryName
                ) : (
                  <span className="text-gray-400">Tüm Ürünler</span>
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
                {/* Tüm Ürünler Seçeneği */}
                <Listbox.Option
                  key="all-products"
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={null}
                >
                  {({ selected }) => (
                    <div className="flex items-center justify-between">
                      <div
                        className={`truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        Tüm Ürünler
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
                {/* Diğer Kategoriler */}
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
        <button
          className="flex lg:gap-3 md:gap-2  w-1/8 mx-auto gap-1 hover:bg-blue-900 px-2 py-1 justify-center items-center rounded-md hover:text-white duration-500"
          onClick={handleOpenCategoryAddModal}
        >
          <h2 className=" text-base">Kategori Ekle</h2>
          <Image src={add} alt="Kategori Ekle" width={20} />
        </button>
        <button
          className="flex lg:gap-3 md:gap-2  w-1/8 mx-auto gap-1 hover:bg-blue-800 px-2 py-1 justify-center items-center rounded-md hover:text-white duration-500"
          onClick={handleOpenCategoryEditModal}
        >
          <h2 className=" text-base">Kategori Düzenle</h2>
          <Image src={editIcon} alt="Kategori Düzenle" width={20} />
        </button>
      </div>
      {/* Telefon Ekranı */}
      <div className="flex md:hidden w-full mb-3 z-10 gap-2">
        <p className="w-1/8 text-center flex my-auto font-bold justify-end items-start">
          Kategori
        </p>
        <Listbox value={category} onChange={handleCategoryChange}>
          <div className="relative mt-1 w-4/6">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate text-black ">
                {selectedCategoryName ? (
                  selectedCategoryName
                ) : (
                  <span className="text-gray-400">Tüm Ürünler</span>
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
                {/* Tüm Ürünler Seçeneği */}
                <Listbox.Option
                  key="all-products"
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={null}
                >
                  {({ selected }) => (
                    <div className="flex items-center justify-between">
                      <div
                        className={`truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        Tüm Ürünler
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
                {/* Diğer Kategoriler */}
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
        {/* <button
          className="flex lg:gap-3 md:gap-2  w-1/8 mx-auto gap-1 hover:bg-blue-900 px-2 py-1 justify-center items-center rounded-md hover:text-white duration-500"
          onClick={handleOpenCategoryAddModal}
        >
          <h2 className=" text-sm">Kategori Ekle</h2>
          <Image
            src={add}
            alt="Kategori Ekle"
            width={20}
          />
        </button>
        <button
          className="flex lg:gap-3 md:gap-2  w-1/8 mx-auto gap-1 hover:bg-blue-800 px-2 py-1 justify-center items-center rounded-md hover:text-white duration-500"
          onClick={handleOpenCategoryEditModal}
        >
          <h2 className=" text-xs">Kategori Düzenle</h2>
          <Image
            src={editIcon}
            alt="Kategori Düzenle"
            width={20}
          />
        </button> */}
      </div>
      {/* Büyük Ekran */}
      <div className="md:flex hidden  ">
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 400 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, font: "bold" }}
                    >
                      <p className="font-bold text-lg">
                        {column.id === "productImage"
                          ? "Ürün İsmi"
                          : column.label}
                      </p>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts && filteredProducts.length > 0 ? (
                  filteredProducts
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((productData) => (
                      <TableRow
                        key={productData._id}
                        onClick={() => {
                          handleProductDetail(productData._id);
                          setDetailOrUpdate(false);
                        }}
                        className="cursor-pointer"
                      >
                        {columns.map((column) => {
                          if (column.id === "productImage") {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {productData.productImage ? (
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
                                      {column.render(productData)}
                                    </div>
                                    <span style={{ marginLeft: "10px" }}>
                                      {productData.productName}
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
                                        alt="Placeholder"
                                        layout="responsive"
                                        width={80}
                                        height={100}
                                        objectFit="contain"
                                        className="min-h-[40px]"
                                      />
                                    </div>
                                    <span style={{ marginLeft: "10px" }}>
                                      {productData.productName}
                                    </span>
                                  </div>
                                )}
                              </TableCell>
                            );
                          } else if (column.id === "productQuantity") {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {productData.productQuantity}{" "}
                                {productData.productPackageType}
                              </TableCell>
                            );
                          } else if (column.id === "actions" && !belgeyeDon) {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <div>
                                  <Button
                                    variant="text"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleProductDetail(productData._id);
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
                                      setSelectedProductId(productData._id);
                                      handleOpenDeleteModal();
                                    }}
                                  >
                                    Sil
                                  </Button>
                                </div>
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
                      Aradığınız isimde ürün bulunamadı.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={AllProductData?.length}
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
          filteredProducts.map((productData) => (
            <div
              key={productData._id}
              className="cursor-pointer border-2 border-dark-purple my-1 rounded-lg px-2 py-1 "
              onClick={() => {
                handleProductDetail(productData._id);
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
                  {productData.productImage ? (
                    <img
                      src={productData.productImage}
                      width={50}
                      className="max-h-16  "
                    />
                  ) : (
                    <Image
                      src={logo2}
                      alt="Placeholder"
                      layout="responsive"
                      width={80}
                      height={100}
                      objectFit="contain"
                      className="max-h-16"
                    />
                  )}
                  <span className="m-auto font-semibold w-full ml-2">
                    {productData.productName}
                  </span>
                </div>

                {/* Ürün Adı */}

                {/* Adet ve Fiyat */}
                <div className="flex flex-col ">
                  {productData.productQuantity && (
                    <p className="font-semibold">
                      Adet: {productData.productQuantity}
                    </p>
                  )}
                  {productData.productListPrice && (
                    <p className="font-semibold">
                      Fiyat: {productData.productListPrice}
                    </p>
                  )}
                </div>
              </div>

              {/* Düzenle ve Sil Düğmeleri */}
              <div className="flex justify-between">
                <p className="text-xs font-semibold mt-1">
                  Stok Kodu:{productData.productCode}
                </p>
                {!belgeyeDon && (
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
                        handleProductDetail(productData._id);
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
                        setSelectedProductId(productData._id);
                        handleOpenDeleteModal();
                      }}
                    >
                      Sil
                    </button>
                  </div>
                )}
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

      {/* <div className="md:hidden flex flex-col">
        {filteredProducts && filteredProducts.length > 0
          ? filteredProducts.map((productData) => (
              <p>{productData.productName}</p>
            ))
          : null}
      </div> */}
      <ModalComponent
        open={open}
        handleClose={handleClose}
        ProductDetail={ProductDetail}
        detailOrUpdate={detailOrUpdate}
      />
      <BelgeyeUrunEklemeModal
        ProductDetail={ProductDetail}
        openBelgedenGelenModal={openBelgedenGelenModal}
        handleCloseBelgedenGelenModalOpen={handleCloseBelgedenGelenModalOpen}
        pageStok={decryptedPageStok}
        documentId={decryptedDocumentId}
      />

      <AddingModal
        openAddingModal={openAddingModal}
        handleCloseAddingModal={handleAddingModalClose}
        addNewProduct={addNewProduct}
        productImage={productImage}
        onFinishFailed={onFinishFailed}
        productName={productName}
        productCode={productCode}
        productQuantity={productQuantity}
        productPrice={productListPrice}
        productPackageType={productPackageType}
        productBarcode={productBarcode}
        productAddress={productAddress}
        productDescription={productDescription}
        handleProductNameChange={handleProductNameChange}
        handleProductCodeChange={handleProductCodeChange}
        handleProductImageChange={handleProductImageChange}
        handleProductQuantityChange={handleProductQuantityChange}
        handleProductPriceChange={handleProductPriceChange}
        handleProductPackageTypeChange={handleProductPackageTypeChange}
        handleProductBarcodeChange={handleProductBarcodeChange}
        handleProductAddressChange={handleProductAddressChange}
        handleProductDescriptionChange={handleProductDescriptionChange}
        getAllCategoriesData={getAllCategoriesData}
        category={category}
        setCategory={setCategory}
        birim={birim}
        handleCityChange={handleCityChange}
      />
      <DeleteModal
        open={openDeleteModal}
        handleDeleteProduct={handleDeleteProduct}
        handleCloseDeleteModal={handleCloseDeleteModal}
      />
      <NewCategoryModal
        categoryAddModal={categoryAddModal}
        handleCloseCategoryAddModal={handleCloseCategoryAddModal}
        categorySelect={categorySelect}
        setCategorySelect={setCategorySelect}
        addNewCategory={addNewCategory}
      />
      <EditcategoryModal
        categoryEditModal={categoryEditModal}
        handleCloseCategoryEditModal={handleCloseCategoryEditModal}
      />
    </div>
  );
};

export default Stok;
