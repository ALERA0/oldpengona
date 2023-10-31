import {
  addVirtualIncomingDocProcess,
  addVirtualOutgoingDocProcess,
} from "@/src/api";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const MenuLink = ({
  src,
  menuTitle,
  open,
  href,
  hideOnMd,
  handleCategory,
  noHref,
  handleClick,
  cikis,
}) => {
  const dispatch = useDispatch();
  const { data: fil } = useSelector(
    (state) => state.virtualIncomingProductDetail
  );
  const { data: outgoingVirtualDocDetail } = useSelector(
    (state) => state.getVirtualOutgoingProductDetail
  );

  const handleLinkClick = () => {
    handleClick(href);
    if (noHref && !cikis) {
      if (fil?.products == undefined && fil?.products.length !== 0) {
        dispatch(addVirtualIncomingDocProcess());
      }
    } else if (noHref && cikis) {
      if (
        outgoingVirtualDocDetail?.products == undefined &&
        outgoingVirtualDocDetail?.products.length !== 0
      ) {
        dispatch(addVirtualOutgoingDocProcess());
      }
    }
  };

  return (
    <li
      className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
    my-4 ${hideOnMd ? "md:hidden" : ""}`}
    >
      {noHref ? (
        <div className="flex gap-x-4" onClick={handleLinkClick}>
          <Image src={src} />
          <span
            className={`${
              !open && "hidden"
            } origin-left duration-200 text-lg font-bold `}
          >
            {menuTitle}
          </span>
        </div>
      ) : hideOnMd ? (
        <div className="flex gap-x-4" onClick={handleCategory}>
          <Image src={src} />
          <span
            className={`${
              !open && "hidden"
            } origin-left duration-200 text-lg font-bold `}
          >
            {menuTitle}
          </span>
        </div>
      ) : (
        <div className="flex gap-x-4" onClick={handleLinkClick}>
          <Image src={src} />
          <span
            className={`${
              !open && "hidden"
            } origin-left duration-200 text-lg font-bold `}
          >
            {menuTitle}
          </span>
        </div>
      )}
    </li>
  );
};

export default MenuLink;
