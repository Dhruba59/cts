'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import logo from '@/assets/image/cts-logo.png';
import userAvatar from '@/assets/image/dummy-avatar.png';
import { DownArrowIcon, SidebarToggleIcon } from '@/assets/icons';
import { useSidebarContext } from '@/context/sidebar-context';
import Popup from '../pop-up';
import MenuItems from '../menu-item';
import DarkModeToggleSwitch from '../ui/dark-mode-toggle';
import { THEME_COLOR_ENUM } from '@/model/context';
import { STORAGE_CONSTANT } from '@/constants/storage-constant';


const menuItems = [
  { icon: '', text: 'Settings', href: '' },
  { icon: '', text: 'Profile' },
  { icon: '', text: 'Log out', href: '' },
];

const Header = () => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const {isSidebarOpen, setIsSidebarOpen} = useSidebarContext();
  const isChecked = localStorage.getItem(STORAGE_CONSTANT.THEME) === THEME_COLOR_ENUM.DARK;

  const handleTogglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }

  const onThemeChange = (value: boolean) => {
    if(value === true){
      document.documentElement.classList.add(THEME_COLOR_ENUM.DARK);
      localStorage.setItem(STORAGE_CONSTANT.THEME, THEME_COLOR_ENUM.DARK);
    } else {
      document.documentElement.classList.remove(THEME_COLOR_ENUM.DARK);
      localStorage.removeItem(STORAGE_CONSTANT.THEME);
    }
  }

  return (
    <div className="w-full px-4 py-2 flex justify-between items-center border-b-red-500 border-b-2 h-[52px]">
      <SidebarToggleIcon className='cursor-pointer block md:hidden' onClick={toggleSidebar} />
      <div className="flex items-center">
        <Link href="/">
          <Image src={logo} alt="logo" height={40}/>
        </Link>
      </div>
      <div className='relative flex items-center gap-x-4'>
        <DarkModeToggleSwitch onChange={onThemeChange} checked={isChecked}/>
        <Image src={userAvatar} alt='user-photo' height={40} width={40}/>
        <span>
          <h5 className='text-sm'>John doe</h5>
          <p className='text-xs font-normal text-gray-500 dark:text-gray-200'>Manager</p>
        </span>
        <DownArrowIcon className={`cursor-pointer transition-all duration-200 ${isPopupOpen && 'rotate-180'}`} onClick={handleTogglePopup}/>
        <Popup show={isPopupOpen} onClose={() => setIsPopupOpen(false)} horizontalPosition='right' verticalPosition='bottom'>
         <MenuItems menus={menuItems} className='w-[200px] text-sm'/>
        </Popup>
      </div>
    </div>
  );
};

export default Header;