import Image from "next/image";
import React from "react";
import logo from '@/assets/image/cts-logo.png';

const Header = () => (
  <nav className="bg-white h-[52px] px-16 py-2 border-b-2 border-primary sticky top-0 flex items-center justify-center md:justify-between z-50">
    <Image
      src={logo}
      alt="logo"
      height={40}
      // width={106}
      priority
    />
  </nav>
);

export default Header;
