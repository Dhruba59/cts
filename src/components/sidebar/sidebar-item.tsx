"use client";
import { DownArrowIcon } from "@/assets/icons";
import { SidebarItemProps } from "@/model/layout";
import { Fragment, useState } from "react";
import Popup from "../pop-up";
import MenuItems from "../menu-item";
import { useThemeContext } from "@/context/theme-context";
import { THEME_COLOR_ENUM } from "@/model/context";
import { usePathname, useRouter } from "next/navigation";

const SidebarItem = ({ item, showIconOnly = false }: SidebarItemProps) => {
  const [expanded, setExpanded] = useState(false);
  const { theme, setTheme } = useThemeContext();
  const router = useRouter();
  const isDarkMode = theme === THEME_COLOR_ENUM.DARK;

  let pathname = usePathname();
  pathname = pathname[0] ? pathname.slice(1) : pathname;
  const selected = pathname === item.url || pathname.includes(item.funtionality.toLowerCase())

  const menuItems = item?.child?.map((item: any) => ({
    icon: item?.icon,
    content: item?.funtionality,
    url: item?.url
  }));

  const toggleExpand = () => {
    setExpanded(!expanded);

    if (item?.child && item?.child.length === 0) {
      router.push(`/${item.url}`);
    }
  };

  return (
    <Fragment>
      <div
        className={`relative flex items-center gap-x-2 px-2 mx-2 py-2 my-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${showIconOnly ? "group" : ""
          } ${selected ? "bg-red-200 dark:bg-red-900" : ""}`}
        onClick={toggleExpand}
      >
        {item?.icon && (
          <div className="w-6 h-6 flex justify-center items-center">
            {item?.icon}
          </div>
        )}
        {item?.child && item?.child.length > 0 && (
          <Popup
            show={true}
            className="w-60 hidden group-hover:block top-10 left-[164px] z-[10000]"
            showArrow
          >
            <MenuItems menus={menuItems} className="text-sm font-semibold"/>
          </Popup>
        )}
        {!showIconOnly && (

          <div className="flex-grow font-medium text-base truncate">{item?.funtionality} </div>

        )}
        {item?.child && item?.child.length > 0 && !showIconOnly && (
          <div className="w-6 h-6 ml-2">
            <DownArrowIcon
              className={`h-full w-3 ${expanded ? "rotate-180" : ""}`}
              fill={isDarkMode ? "white" : "black"}
            />
          </div>
        )}
      </div>

      {item?.child && item?.child.length > 0 && !showIconOnly && (
        <div
          className={`ml-6 my-2 border-l border-l-[#b3b2b2]  ${expanded ? "h-auto" : "h-0 hidden"
            } transition duration-300`}
        >
          {item?.child?.map((subItem, index) => (
            <SidebarItem
              key={index}
              item={subItem}
              showIconOnly={showIconOnly}
            />
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default SidebarItem;
