"use client";
import { MenuContext } from "@/context/MenuContext";
import React, { useContext } from "react";
import { FaBars } from "react-icons/fa";

const Header = () => {
  const { toggle } = useContext(MenuContext);
  return (
    <div className="bg-white flex justify-between items-center px-4 h-24 mb-0">
      <div>Brand</div>
      <div onClick={toggle} className="lg:hidden">
        <FaBars />
      </div>
    </div>
  );
};

export default Header;
