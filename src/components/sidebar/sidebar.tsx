"use client";
import { useEffect, useState } from "react";
import SidebarItem from "./sidebar-item";
import {
  SettingsIcon,
  SidebarExpandIcon,
  SidebarMinimizeIcon
} from "@/assets/icons";
import { useSidebarContext } from "@/context/sidebar-context";
import { useMenuItemsContext } from "@/context/menu-items-context";

const Sidebar: React.FC = ({}) => {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebarContext();
  const [isSidebarMinimize, setIsSidebarMinimize] = useState<boolean>(false);
  const { items, setItems } = useMenuItemsContext();

  useEffect(() => {
    if (window) {
      window.addEventListener("resize", (e: any) => {
        if (e.target?.innerWidth && e.target?.innerWidth < 768) {
          setIsSidebarOpen(false);
          setIsSidebarMinimize(false);
        } else {
          setIsSidebarOpen(true);
        }
      });
    }
  }, []);

  return (
    <div
      className={`absolute min-h-screen h-auto md:relative bg-white dark:bg-neutral-black max-w-[250px] border-r  ${
        isSidebarOpen ? "block" : "hidden"
      }`}
    >
      <SidebarExpandIcon
        className={`absolute -right-[14px] z-10 top-4 cursor-pointer hidden md:${
          isSidebarMinimize ? "hidden" : "block"
        }`}
        onClick={() => setIsSidebarMinimize(!isSidebarMinimize)}
      />
      <SidebarMinimizeIcon
        className={`absolute -right-[14px] z-10 top-4 cursor-pointer hidden md:${
          !isSidebarMinimize ? "hidden" : "block"
        }`}
        onClick={() => setIsSidebarMinimize(!isSidebarMinimize)}
      />
      {items.map((item, index) => (
        <SidebarItem key={index} item={item} showIconOnly={isSidebarMinimize} />
      ))}
      {/* <hr /> */}
      {/* <SidebarItem icon={<SettingsIcon />} text='Settings' showIconOnly={isSidebarMinimize} /> */}
    </div>
  );
};

export default Sidebar;
