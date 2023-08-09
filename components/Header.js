"use client";
import { MenuContext } from "@/context/MenuContext";
import React, { useContext } from "react";
import { FaBars } from "react-icons/fa";

const Header = () => {
  const { toggle } = useContext(MenuContext);
  return (
    <div className="flex justify-between gap-3 items-center p-4">
      <div onClick={toggle} className=" hover:cursor-pointer">
        <FaBars />
      </div>
      <div>Brand</div>
    </div>
  );
};

export default Header;
