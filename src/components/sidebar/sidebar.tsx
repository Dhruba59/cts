'use client';
import { useEffect, useState } from 'react';
import SidebarItem from './sidebar-item';
import { SettingsIcon, SidebarExpandIcon, SidebarMinimizeIcon } from '@/assets/icons';
import { SidebarProps } from '@/model/layout';
import { useSidebarContext } from '@/context/sidebar-context';

const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  const {isSidebarOpen, setIsSidebarOpen} = useSidebarContext();
  const [isSidebarMinimize, setIsSidebarMinimize] = useState<boolean>(false);
  
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
    <div className={`relative max-w-[250px] h-screen border-r ${isSidebarOpen ? 'block' : 'hidden'}`}>
      <SidebarExpandIcon className={`absolute -right-[14px] z-10 top-4 cursor-pointer hidden md:${isSidebarMinimize ? 'hidden' : 'block'}`} onClick={() => setIsSidebarMinimize(!isSidebarMinimize)}/>
      <SidebarMinimizeIcon className={`absolute -right-[14px] z-10 top-4 cursor-pointer hidden md:${!isSidebarMinimize ? 'hidden' : 'block'}`} onClick={() => setIsSidebarMinimize(!isSidebarMinimize)}/>
      {items.map((item, index) => (
        <SidebarItem key={index} {...item} showIconOnly={isSidebarMinimize}/>
      ))}
      <hr />
      <SidebarItem icon={<SettingsIcon />} text='Settings' showIconOnly={isSidebarMinimize} />
    </div>
  );
};

export default Sidebar;
