'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import logo from '@/assets/image/cts-logo.png';
import userAvatar from '@/assets/image/dummy-avatar.png';
import { DownArrowIcon, SidebarToggleIcon } from '@/assets/icons';
import { useSidebarContext } from '@/context/sidebar-context';

const Header = () => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const {isSidebarOpen, setIsSidebarOpen} = useSidebarContext();
  
  const handleTogglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <div className="w-full p-4 flex justify-between items-center border-b ">
      <SidebarToggleIcon className='cursor-pointer block md:hidden' onClick={toggleSidebar} />
      <div className="flex items-center">
        <Link href="/">
          <Image src={logo} alt="logo" />
        </Link>
      </div>
      <div className='flex items-center gap-x-4'>
        <Image src={userAvatar} alt='user-photo' height={40} width={40}/>
        <span>
          <h5>John doe</h5>
          <p className='text-sm font-normal text-gray-500'>Manager</p>
        </span>
        <DownArrowIcon className='cursor-pointer' onClick={handleTogglePopup}/>
      </div>
    </div>
  );
};

export default Header;
