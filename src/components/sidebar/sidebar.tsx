'use client';
import { useEffect, useMemo, useState } from 'react';
import SidebarItem from './sidebar-item';
import { SidebarExpandIcon, SidebarMinimizeIcon } from '@/assets/icons';
import { useSidebarContext } from '@/context/sidebar-context';
import { useMenuItemsContext } from '@/context/menu-items-context';
import { useSession } from "next-auth/react";
import { createNestedMenusItems } from "@/utils/helpers";

const Sidebar: React.FC = ({}) => {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebarContext();
  const [menuItems, setMenuItems] = useState<any>();
  const [isSidebarMinimize, setIsSidebarMinimize] = useState<boolean>(false);
  const { items, setItems } = useMenuItemsContext();
  const { data: session, status } = useSession();

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

  //@ts-ignore
  const memoizedScreens = useMemo(() => session?.user?.screens, [session?.user?.screens]);
  useEffect(() => {
    if(memoizedScreens && memoizedScreens.length > 0) {
      setItems(createNestedMenusItems(memoizedScreens));
    }
  }, [setItems, memoizedScreens])

  return (
    <div className={`z-10 lg:z-0 fixed top-[66px] min-h-screen h-auto md:relative max-w-[250px] border-r bg-white dark:bg-[#24303f] dark:border-r-gray-700 shadow-lg ${isSidebarOpen ? 'block' : 'hidden'}`}>
      <SidebarExpandIcon className={`absolute -right-[14px] z-10 top-4 cursor-pointer hidden md:${isSidebarMinimize ? 'hidden' : 'block'}`} onClick={() => setIsSidebarMinimize(!isSidebarMinimize)}/>
      <SidebarMinimizeIcon className={`absolute -right-[14px] z-10 top-4 cursor-pointer hidden md:${!isSidebarMinimize ? 'hidden' : 'block'}`} onClick={() => setIsSidebarMinimize(!isSidebarMinimize)}/>
      {items?.map((item, index) => (
        <SidebarItem key={index} item={item} showIconOnly={isSidebarMinimize}/>
      ))}
    </div>
  );
};

export default Sidebar;
