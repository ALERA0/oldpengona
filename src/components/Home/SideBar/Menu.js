import React, { useEffect, useState } from "react";

import Chart_fill from "../../../../public/images/Chart_fill.png";
import control from "../../../../public/images/control.png";
import Folder from "../../../../public/images/Folder.png";
import logo from "../../../../public/images/logo2.png";
import product from "../../../../public/images/product2.png";
import supplier from "../../../../public/images/supplier.png";
import order from "../../../../public/images/order.png";
import category from "../../../../public/images/categories.png";
import settings from "../../../../public/images/settings.png";

import Image from "next/image";
import MenuLink from "./MenuLink";
import Link from "next/link";
import KategoriSecim from "../Stok/KategoriSecim";
import NewCategoryModal from "../Stok/NewCategoryModal";
import {
  addNewCategoryProcess,
  deleteVirtualIncomingDocProcess,
  deleteVirtualOutgoingDocProcess,
  getAllCategoriesProcess,
} from "@/src/api";
import { useDispatch, useSelector } from "react-redux";
import {
  showToastErrorMessage,
  showToastSuccesMessage,
} from "../../ToastComponent";
import { resetAddCategory } from "@/src/redux/slice/add-new-category-slice";
import EditcategoryModal from "../Stok/EditcategoryModal";
import DeleteModal from "../../DeleteModal";
import { useRouter } from "next/router";
import { resetProducts } from "@/src/redux/slice/local-product-slice";
import { resetGetVirtualOutgoingProductDetail } from "@/src/redux/slice/get-virtual-outgoing-product-detail-process-slice";
import { resetDeleteVirtualIncomingDoc } from "@/src/redux/slice/delete-virtual-incoming-doc-slice";
import { resetGetVirtualIncomingProductDetail } from "@/src/redux/slice/get-virtual-incoming-product-detail-process-slice";
import { resetDeleteVirtualOutgoingDoc } from "@/src/redux/slice/delete-virtual-outgoing-doc-slice";
import { resetVirtualIncomingDoc } from "@/src/redux/slice/add-virtual-incoming-doc-slice";
import { resetAddVirtualOutgoingDoc } from "@/src/redux/slice/add-virtual-outgoing-doc-slice";

const Menu = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const [modal, setModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [alert, setAlert] = useState(false);
  const [noHref, setNoHref] = useState(false);
  const [url, setURL] = useState("");

  const [categorySelect, setCategorySelect] = useState("");

  const router = useRouter();
  const { pathname } = router;

  const handleOpenCategoryModal = () => {
    setModal(true);
  };
  const handleCloseCategoryModal = () => {
    setModal(false);
  };
  const handleOpenCategoryAddModal = () => {
    setAddModal(true);
  };
  const handleCloseCategoryAddModal = () => {
    setAddModal(false);
  };
  const handleOpenCategoryEditModal = () => {
    setEditModal(true);
  };
  const handleCloseCategoryEditModal = () => {
    setEditModal(false);
  };
  const handleNoHref = () => {
    setNoHref(true);
  };

  const handleCloseDeleteModal = () => {
    setAlert(false);
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

  const { status: newCategoryStatus } = useSelector(
    (state) => state.addNewCategory
  );
  const { products: productsToAdd2 } = useSelector(
    (state) => state.localProducts
  );
  const { data: newOutgoingVirtualDoc } = useSelector(
    (state) => state.addVirtualOutgoingDoc
  );
  const { data: virtualDocData } = useSelector(
    (state) => state.addVirtualIncomingDoc
  );
  const { data: fil } = useSelector(
    (state) => state.virtualIncomingProductDetail
  );
  const { data: outgoingVirtualDocDetail } = useSelector(
    (state) => state.getVirtualOutgoingProductDetail
  );
  const { status: deleteVirtualIncomingDocStaus } = useSelector(
    (state) => state.deleteVirtualIncomingDoc
  );
  const { status: deleteVirtualOutgoingDocStatus } = useSelector(
    (state) => state.deleteVirtualOutgoingDoc
  );


  const handleDeleteProduct = async () => {
    await dispatch(
      deleteVirtualIncomingDocProcess({
        virtualDocId: virtualDocData?._id,
      })
    );
    await dispatch(
      deleteVirtualOutgoingDocProcess({
        virtualDocId: newOutgoingVirtualDoc?._id,
      })
    );
    await router.push(url);
    await setAlert(false);
  };

  useEffect(() => {
    if (newCategoryStatus === "success") {
      showToastSuccesMessage("Kategori başarıyla eklendi");
      dispatch(resetAddCategory());
    } else if (newCategoryStatus === "error") {
      showToastErrorMessage("Kategori eklenemedi");
      dispatch(resetAddCategory());
    }
  }, [newCategoryStatus]);

  const handleClick = async (href) => {
    if (pathname == href) {
      null;
    } else if (
      fil?.products !== undefined &&
      fil?.products.length == 0 &&
      pathname === "/stokTakip/urunGiris"
    ) {
      await dispatch(
        deleteVirtualIncomingDocProcess({
          virtualDocId: virtualDocData?._id,
        })
      );
      await router.push(href);
    } else if (
      outgoingVirtualDocDetail?.products !== undefined &&
      outgoingVirtualDocDetail?.products.length == 0 &&
      pathname === "/stokTakip/urunCikis"
    ) {
      await dispatch(
        deleteVirtualOutgoingDocProcess({
          virtualDocId: newOutgoingVirtualDoc?._id,
        })
      );
      await router.push(href);
    } else if (
      fil?.products.length > 0 ||
      outgoingVirtualDocDetail?.products.length > 0
    ) {
      setAlert(true);
      setURL(href);
    } else {
      router.push(href);
    }
  };

  useEffect(() => {
    if (deleteVirtualIncomingDocStaus === "success") {
      dispatch(resetGetVirtualIncomingProductDetail());
      dispatch(resetDeleteVirtualIncomingDoc());
      dispatch(resetVirtualIncomingDoc())
    }
    if(deleteVirtualOutgoingDocStatus === "success"){
      dispatch(resetGetVirtualOutgoingProductDetail())
      dispatch(resetDeleteVirtualOutgoingDoc())
      dispatch(resetAddVirtualOutgoingDoc())
    }
  }, [deleteVirtualIncomingDocStaus,deleteVirtualOutgoingDocStatus]);

  return (
    <div className="flex ">
      {/* Büyük Ekran */}
      <div
        className={` ${
          open ? "w-60" : "w-12 "
        } bg-dark-purple h-screen pl-1 ease-in  md:pt-8 pt-5 relative duration-300 md:flex flex-col hidden`}
      >
        <Image
          src={control}
          className={`absolute md:hidden cursor-pointer -right-4 md:top-9 top-5 w-8  border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-1 items-center">
          <Link href="/" className="md:hidden">
            <Image
              src={logo}
              className={`cursor-pointer duration-500 ${
                open && "rotate-[360deg]"
              }`}
              width={30}
            />
          </Link>
          <Link href="/" className="md:flex hidden">
            <Image
              src={logo}
              className={`cursor-pointer duration-500 ${
                open && "rotate-[360deg]"
              }`}
              width={40}
            />
          </Link>
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Pengona Yazılım
          </h1>
        </div>
        <ul className="md:pt-6 ">
          <MenuLink
            src={Chart_fill}
            menuTitle={"Ürün Stoğu"}
            open={open}
            href={"/stokTakip"}
            handleClick={handleClick}
          />
          <MenuLink
            src={Folder}
            menuTitle={"Belgeler"}
            open={open}
            href={"/stokTakip/belgeler"}
            handleClick={handleClick}
          />
          <MenuLink
            src={order}
            menuTitle={"Ürün Girişi"}
            open={open}
            noHref={true}
            cikis={false}
            href={"/stokTakip/urunGiris"}
            handleClick={handleClick}
          />
          <MenuLink
            src={product}
            menuTitle={"Ürün Çıkışı"}
            open={open}
            noHref={true}
            cikis={true}
            href={"/stokTakip/urunCikis"}
            handleClick={handleClick}
          />
          <MenuLink
            src={supplier}
            menuTitle={"Cari"}
            open={open}
            href={"/stokTakip/cari"}
            handleClick={handleClick}
          />
          <MenuLink
            src={category}
            menuTitle={"Kategori İşlemleri"}
            open={open}
            hideOnMd={true}
            handleCategory={handleOpenCategoryModal}
          />
          <MenuLink
            src={settings}
            menuTitle={"Ayarlar"}
            open={open}
            href={"/stokTakip/ayarlar"}
            handleClick={handleClick}
          />
        </ul>
      </div>
      {/* Küçük Ekran */}
      <div
        className={` ${
          !open ? "w-60" : "w-12 "
        } bg-dark-purple h-screen pl-1 ease-in  md:pt-8 pt-5 relative duration-300 md:hidden flex-col`}
      >
        <Image
          src={control}
          className={`absolute md:hidden cursor-pointer -right-4 md:top-9 top-5 w-8  border-dark-purple
           border-2 rounded-full  ${open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-1 items-center">
          <Link href="/" className="md:hidden">
            <Image
              src={logo}
              className={`cursor-pointer duration-500 ${
                !open && "rotate-[360deg]"
              }`}
              width={30}
            />
          </Link>
          <Link href="/" className="md:flex hidden">
            <Image
              src={logo}
              className={`cursor-pointer duration-500 ${
                !open && "rotate-[360deg]"
              }`}
              width={40}
            />
          </Link>
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              open && "scale-0"
            }`}
          >
            Pengona Yazılım
          </h1>
        </div>
        <ul className="md:pt-6 ">
          <MenuLink
           src={Chart_fill}
           menuTitle={"Ürün Stoğu"}
           open={!open}
           href={"/stokTakip"}
           handleClick={handleClick}
          />
          <MenuLink
           src={Folder}
           menuTitle={"Belgeler"}
           open={!open}
           href={"/stokTakip/belgeler"}
           handleClick={handleClick}
          />
          <MenuLink
            src={order}
            menuTitle={"Ürün Girişi"}
            open={!open}
            noHref={true}
            cikis={false}
            href={"/stokTakip/urunGiris"}
            handleClick={handleClick}
          />
          <MenuLink
            src={product}
            menuTitle={"Ürün Çıkışı"}
            open={!open}
            noHref={true}
            cikis={true}
            href={"/stokTakip/urunCikis"}
            handleClick={handleClick}
          />
          <MenuLink
           src={supplier}
           menuTitle={"Cari"}
           open={!open}
           href={"/stokTakip/cari"}
           handleClick={handleClick}
          />
          <MenuLink
            src={category}
            menuTitle={"Kategori İşlemleri"}
            open={!open}
            hideOnMd={true}
            handleCategory={handleOpenCategoryModal}
          />
          <MenuLink
            src={settings}
            menuTitle={"Ayarlar"}
            open={!open}
            href={"/stokTakip/ayarlar"}
            handleClick={handleClick}
          />
        </ul>
      </div>
      <KategoriSecim
        modal={modal}
        handleCloseCategoryModal={handleCloseCategoryModal}
        handleOpenCategoryAddModal={handleOpenCategoryAddModal}
        handleOpenCategoryEditModal={handleOpenCategoryEditModal}
      />
      <NewCategoryModal
        handleCloseCategoryAddModal={handleCloseCategoryAddModal}
        categoryAddModal={addModal}
        categorySelect={categorySelect}
        setCategorySelect={setCategorySelect}
        addNewCategory={addNewCategory}
      />
      <EditcategoryModal
        categoryEditModal={editModal}
        handleCloseCategoryEditModal={handleCloseCategoryEditModal}
      />
      <DeleteModal
        text={"Belgeye Eklediğiniz Ürünler Silinecektir. "}
        open={alert}
        handleCloseDeleteModal={handleCloseDeleteModal}
        handleDeleteProduct={handleDeleteProduct}
      />
    </div>
  );
};

export default Menu;
