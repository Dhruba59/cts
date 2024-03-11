"use client";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/image/cts-logo.png";
import userAvatar from "@/assets/image/dummy-avatar.png";
import { DownArrowIcon, SidebarToggleIcon } from "@/assets/icons";
import { useSidebarContext } from "@/context/sidebar-context";
import Popup from "../pop-up";
import MenuItems from "../menu-item";
import DarkModeToggleSwitch from "../ui/dark-mode-toggle";
import { THEME_COLOR_ENUM } from "@/model/context";
import { STORAGE_KEY } from "@/constants/storage-constant";
import { useThemeContext } from "@/context/theme-context";
import { signOut, useSession } from "next-auth/react";
import { getUserRoleFromValue } from "@/utils/helpers";

const handleLogout = () => {
  // deleteSession();
  // deleteRemember();
  localStorage.removeItem(STORAGE_KEY.AUTH_TOKEN);
  signOut({ callbackUrl: "/auth/login" })
};

const DarkModeSwitchContent = (
  <div className="w-full flex justify-between items-center">
    <span>Theme</span>
    <DarkModeToggleSwitch iconClassName="!h-4" inputClassName="w-[42px] !h-4"/> 
  </div>
)

const menuItems = [
  { icon: '', content: 'Profile' },
  { icon: '', content: 'Change Password', href: 'change-password' },
  { icon: '', content: 'Log out', onClick: handleLogout },
  { icon: '', content: DarkModeSwitchContent },
];

const Header = () => {
  const [ isPopupOpen, setIsPopupOpen ] = useState<boolean>(false);
  const { isSidebarOpen, setIsSidebarOpen } = useSidebarContext();
  const [ userRole, setUserRole ] = useState<string>('');
  const { theme } = useThemeContext();
  const isDark = theme === THEME_COLOR_ENUM.DARK;
  const { data: session } = useSession();

  const handleTogglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  useEffect(() => {
    setUserRole(getUserRoleFromValue(localStorage.getItem(STORAGE_KEY.ROLE) ?? ''));
  }, []);

  return (
    <div className="fixed z-50 bg-white dark:bg-[#24303f] w-full px-4 py-2 flex justify-between items-center shadow-md border-b-red-500 border-b-2 h-[64px]">
      <SidebarToggleIcon
        className="cursor-pointer block md:hidden"
        fill={isDark ? "white" : "black"}
        onClick={toggleSidebar}
      />
      <div className="flex items-center">
        <Link href="/">
          <Image src={logo} alt="logo" height={40} />
        </Link>
      </div>
      <div className="relative flex items-center gap-x-4">
        <DarkModeToggleSwitch containerClassName='hidden sm:block h-8'/>
        <Image
          src={userAvatar}
          alt="user-photo"
          className="rounded-full"
          height={40}
          width={40}
        />
        <span>
          {/* @ts-ignore */}
          <h5 className="text-sm dark:text-white">{session?.user?.lastName}</h5>       
          <p className="text-xs font-normal text-gray-500 dark:text-gray-200">
           {userRole}
          </p>
        </span>
        <DownArrowIcon
          className={`cursor-pointer transition-all duration-200 ${
            isPopupOpen && "rotate-180"
          }`}
          onClick={handleTogglePopup}
          fill={isDark ? "white" : "black"}
        />
        <Popup
          show={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          className="-right-[120px] top-28"
        >
          <MenuItems menus={menuItems} className="w-[200px] text-sm" />
        </Popup>
      </div>
    </div>
  );
};

export default Header;
