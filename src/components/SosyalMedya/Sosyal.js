import React from "react";
import Link from "next/link";
import Image from "next/image";
import facebookIcon from "../../../public/icons/socialMedia/facebook.svg";
import instagramIcon from "../../../public/icons/socialMedia/instagram.svg";
import twitterIcon from "../../../public/icons/socialMedia/twitter.svg";
import linkedinIcon from "../../../public/icons/socialMedia/linkedin.svg";
import { useRouter } from "next/router";


const Sosyal = () => {

  const router = useRouter()

  const handleStokTakipApp =()=>{
    router.push("/stokTakip/login")
  }

  return (
    <div className="flex items-center justify-center gap-2 ">
       <Link href="http://94.54.108.67:8069/web/login"  className="flex flex-col">
            
            <p className="text-xs font-semibold text-white">ERP-Giriş</p>
          </Link>
      <Link
        href="https://www.facebook.com/pengonasoftware/"
        className="p-1 rounded-full bg-white"
        target="_blank"
      >
        <Image src={facebookIcon} width={25} height={25} />
      </Link>
      <Link
        href="https://www.instagram.com/pengona_tr/?hl=en"
        className="p-2 rounded-full bg-white"
        target="_blank"
      >
        <Image src={instagramIcon} width={15} height={15} />
      </Link>
      {/* <Link href="/" className="p-2 rounded-full bg-white">
        <Image src={twitterIcon} width={15} height={15} />
      </Link> */}
      <Link
        href="https://www.linkedin.com/company/pengona-software/"
        className="p-2 rounded-full bg-white"
        target="_blank"
      >
        <Image src={linkedinIcon} width={15} height={15} />
      </Link>
     
      <div className="text-white text-center cursor-pointer" onClick={handleStokTakipApp}>
        <p>Giriş</p>
      </div>
    </div>
  );
};

export default Sosyal;