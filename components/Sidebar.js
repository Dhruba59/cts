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
  const allmenus = [
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
      isOpen: false,
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
      isOpen: false,
      subMenuItems: [
        { title: "Profile", url: "/Settings/Profile", icon: <BsPerson /> }
      ]
    },
    { title: "Logout", url: "/", icon: <AiOutlineLogout /> }
  ];

  const { open } = useContext(MenuContext);
  const [menus, setMenus] = useState(allmenus);

  const toggleSubMenuOpen = (index) => {
    setMenus((prevMenus) =>
      prevMenus.map((menu, i) => {
        if (i === index) {
          return { ...menu, isOpen: !menu.isOpen };
        } else {
          return { ...menu, isOpen: false };
        }
      })
    );
  };

  return (
    <div
      className={`bg-dark-purple py-0 ${open ? "px-5" : "px-2"} 
      ${open ? "w-[16vw]" : "w-[4vw]"} relative duration-300 h-screen `} //lg:w-64
    >
      {/* top */}
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

      {/* middle */}
      <div className="h-[80vh]">
        <div
          className={`flex items-center rounded-md bg-light-white mt-6 ${
            !open ? "px-2.5" : "px-4"
          } py-2`}
        >
          <BsSearch
            className={`text-white text block float-left cursor-pointer ${
              open && "mr-2"
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
              hover:bg-light-white rounded-md group ${
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
                          toggleSubMenuOpen(index);
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
                    {!open && (
                      <div
                        className={`
                                absolute left-full px-2 py-0 -mt-2 ml-0 w-28
                                bg-dark-purple text-indigo-800 text-sm
                                invisible opacity-20 -translate-x-3 transition-all
                                group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                            `}
                      >
                        {menu.submenu && !open && (
                          <ul>
                            {menu.subMenuItems.map((submenuItem, idx) => (
                              <li
                                key={idx}
                                className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer
                                 p-2 px-5 hover:bg-light-white`}
                              >
                                <Link
                                  href={`${submenuItem.url}`}
                                  className="flex-1"
                                >
                                  {submenuItem.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                    {menu.submenu && open && (
                      <BsChevronDown
                        className={`${
                          menu.isOpen && "rotate-180"
                        } text-lg mt-2 block items-center float-left`}
                        onClick={() => toggleSubMenuOpen(index)}
                      />
                    )}
                  </li>
                  {menu.submenu && open && menu.isOpen && (
                    <ul>
                      {menu.subMenuItems.map((submenuItem, idx) => (
                        <li
                          key={idx}
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
      </div>

      {/* end */}
      <div className="h-[5vh] flex">
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
            <h4 className="font-semibold text-gray-600">John Doe</h4>
            <span className="text-xs text-gray-600">johndoe@gmail.com</span>
          </div>
          <AiOutlineSetting size={20} className="text-gray-600" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
