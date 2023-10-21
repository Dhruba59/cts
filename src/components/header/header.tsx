'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import logo from '@/assets/image/cts-logo.png';
import userAvatar from '@/assets/image/dummy-avatar.png';
import { DownArrowIcon, SidebarToggleIcon } from '@/assets/icons';
import { useSidebarContext } from '@/context/sidebar-context';
import Popup from '../pop-up';
import MenuItem from '../menu-item';
import MenuItems from '../menu-item';
import Toggle from '../ui/toggle';
import { useThemeContext } from '@/context/theme-context';

enum THEME_COLOR_ENUM {
  DARK = 'dark',
  DEFAULT = 'default'
}

const Header = () => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const {isSidebarOpen, setIsSidebarOpen} = useSidebarContext();
  const {themeColor, setThemeColor} = useThemeContext();

  const handleTogglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }

  // TODO 
  const onThemeChange = (value: boolean) => {
    setThemeColor(value === true ? THEME_COLOR_ENUM.DARK : THEME_COLOR_ENUM.DEFAULT)
  }

  console.log(themeColor);

  const menuItems = [
    { icon: '', text: 'Menu Item 1', href: '/menu-item-1' },
    { icon: '', text: 'Menu Item 2' },
    { icon: '', text: 'Menu Item 3', href: '/menu-item-3' },
  ];

  return (
    <div className="w-full p-4 flex justify-between items-center border-b ">
      <SidebarToggleIcon className='cursor-pointer block md:hidden' onClick={toggleSidebar} />
      <div className="flex items-center">
        <Link href="/">
          <Image src={logo} alt="logo" />
        </Link>
      </div>
      <div className='relative flex items-center gap-x-4'>
        {/* <Toggle onChange={onThemeChange}/> */}
        <Image src={userAvatar} alt='user-photo' height={40} width={40}/>
        <span>
          <h5>John doe</h5>
          <p className='text-sm font-normal text-gray-500'>Manager</p>
        </span>
        <DownArrowIcon className='cursor-pointer' onClick={handleTogglePopup}/>
        <Popup show={isPopupOpen} onClose={() => setIsPopupOpen(false)} horizontalPosition='right' verticalPosition='bottom'>
         <MenuItems menus={menuItems}/>
        </Popup>
      </div>
    </div>
  );
};

export default Header;
