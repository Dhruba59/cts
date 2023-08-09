"use client";
import React from "react";
import { useState, useContext } from "react";
import {
  BsArrowLeftShort,
  BsSearch,
  BsChevronDown,
  BsFileImageFill,
  BsReverseBackspaceReverse,
  BsPerson
} from "react-icons/bs";
import {
  AiFillEnvironment,
  AiOutlineBarChart,
  AiOutlineHome,
  AiOutlineSetting,
  AiOutlineLogout
} from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";
import Link from "next/link";
import { MenuContext } from "@/context/MenuContext";

const Sidebar = () => {
  const { open } = useContext(MenuContext);
  const [menuOpen, setMenuOpen] = useState(open);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const menus = [
    { title: "Dashboard", url: "/", icon: <AiOutlineHome /> },
    {
      title: "User Admin",
      url: "/User/UserList",
      spacing: true,
      icon: <BsPerson />
    },
    {
      title: "Projects",
      icon: <AiOutlineBarChart />,
      submenu: true,
      subMenuItems: [
        { title: "Sub-1", url: "/" },
        { title: "Sub-2", url: "/" },
        { title: "Sub-3", url: "/" }
      ]
    },
    {
      title: "Settings",
      icon: <AiOutlineSetting />,
      submenu: true,
      subMenuItems: [
        { title: "Profile", url: "/Settings/Profile", icon: <BsPerson /> }
      ]
    },
    { title: "Logout", url: "/", icon: <AiOutlineLogout /> }
  ];
  return (
    <div
      className={`bg-dark-purple py-0 ${open ? "px-5" : "px-5"} 
      ${open ? "w-[20vw]" : "w-20"} relative duration-300 h-screen `} //lg:w-64
    >
      {/* <BsArrowLeftShort
        className={`bg-white mt-4 text-dark-purple text-3xl rounded-full absolute 
        -right-3  border border-dark-purple cursor-pointer ${
          !open && "rotate-180"
        }`}
        onClick={() => setMenuOpen(!open)}
      /> */}
      <div className="inline-flex items-center h-[10vh] ">
        <AiFillEnvironment
          className={`bg-amber-300 text-4xl rounded cursor-pointer
          block float-left mr-2 duration-500 ${open && "rotate-[360deg]"}`}
        />
        <h1
          className={`text-white origin-left font-medium text-2xl duration-300 ${
            !open && "scale-0"
          }`}
        >
          Database
        </h1>
      </div>
      <div
        className={`flex items-center rounded-md bg-light-white mt-6 ${
          !menuOpen ? "px-2.5" : "px-4"
        } py-2`}
      >
        <BsSearch
          className={`text-white text block float-left cursor-pointer ${
            menuOpen && "mr-2"
          }`}
        />
        <input
          type={"Search"}
          placeholder={`${open ? "Search" : ""}`}
          className={`text-base bg-transparent w-full text-white focus:outline-none {${
            !open && "hidden"
          }}`}
        ></input>
      </div>
      <div className="flex flex-col items-stretch">
        <div className="flex flex-col flex-grow">
          <ul className="pt-2">
            {menus.map((menu, index) => (
              <>
                <li
                  key={index}
                  className={`text-gray-300 text-sm flex justify-between cursor-pointer p-2
              hover:bg-light-white rounded-md ${
                menu.spacing ? "mt-2" : "mt-2"
              }`}
                >
                  <Link
                    href={`${menu.submenu ? "" : menu.url}`}
                    className="flex-1 items-center gap-x-4"
                  >
                    <div
                      className="flex items-center gap-x-4"
                      onClick={() => {
                        menu.submenu && setSubmenuOpen(!submenuOpen);
                      }}
                    >
                      <span className="text-2xl block items-center float-left">
                        {menu.icon ? menu.icon : <RiDashboardFill />}
                      </span>
                      <span
                        className={`text-base mt-0 font-medium flex-1 duration-200 ${
                          !open && "hidden"
                        }`}
                      >
                        {menu.title}
                      </span>
                    </div>
                  </Link>
                  {menu.submenu && open && (
                    <BsChevronDown
                      className={`${
                        submenuOpen && "rotate-180"
                      } text-lg mt-2 block items-center float-left`}
                      onClick={() => setSubmenuOpen(!submenuOpen)}
                    />
                  )}
                </li>
                {menu.submenu && submenuOpen && open && (
                  <ul>
                    {menu.subMenuItems.map((submenuItem, index) => (
                      <li
                        key={index}
                        className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer
                                 p-2 px-5 hover:bg-light-white`}
                      >
                        <Link href={`${submenuItem.url}`} className="flex-1">
                          {submenuItem.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t flex p-3">
        <div>
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="w-10 h-10 rounded-md"
          />
        </div>
        <div
          className={`flex justify-between items-center  overflow-hidden transition-all ${
            open ? "w-52 ml-3" : "w-0"
          }`}
        >
          <div className="leading-4">
            <h4 className="font-semibold">John Doe</h4>
            <span className="text-xs text-gray-600">johndoe@gmail.com</span>
          </div>
          <BsFileImageFill size={20} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
