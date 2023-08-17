"use client";
import { MenuContext } from "@/context/MenuContext";
import React, { useContext } from "react";
import { FaBars } from "react-icons/fa";
import { BiUserCircle } from "react-icons/bi";

const Header = () => {
  const { toggle } = useContext(MenuContext);
  return (
    <div className="w-full flex justify-between items-center p-4">
      <div onClick={toggle} className="  hover:cursor-pointer text-1xl">
        <FaBars />
      </div>
      <div className=" hover:cursor-pointer text-2xl text-white">
        <BiUserCircle />
      </div>
    </div>
  );
};

export default Header;
