import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const CustomLink = ({ href, title, className = "" }) => {
  const router = useRouter();
  return (
    <Link
      href={href}
      className={`${className} relative group font-semibold hover:text-blue-500 text-lg`}
    >
      {title}
      <span
        className={`h-[1px] inline-block  group-hover:w-full transition-[width] ease duration-300 bg-dark absolute left-0 -bottom-0.5   ${
          router.asPath === href ? "w-full" : "w-0"
        } `}
      >
        &nbsp;
      </span>
    </Link>
  );
};

export default CustomLink;
