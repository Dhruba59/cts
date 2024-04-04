import Image from "next/image";
import React from "react";
// import logo from '/cts-logo.png';

const Header = () => (
  <nav className="bg-white dark:bg-dark-darkBlue text-black dark:text-white h-[64px] px-16 py-2 border-b-2 border-primary sticky top-0 flex items-center justify-center md:justify-between z-50">
    <Image
      src="/cts-logo-106x56.png"
      alt="logo"
      height={56}
      width={106}
      quality={100}
      priority
    />
  </nav>
);

export default Header;
