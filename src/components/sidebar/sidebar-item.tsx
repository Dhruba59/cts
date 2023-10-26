'use client';
import { DownArrowIcon } from '@/assets/icons';
import { SidebarItemProps } from '@/model/layout';
import { Fragment, useState } from 'react';
import Popup from '../pop-up';
import MenuItems from '../menu-item';

const SidebarItem = ({ icon, text, subitems, showIconOnly = false }: SidebarItemProps) => {
  const [expanded, setExpanded] = useState(false);

  const menuItems = subitems?.map((item: any) => ({
    icon: item?.icon,
    text: item?.text,
    href: item?.href
  }));

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Fragment>
      <div
        className={`relative flex items-center gap-x-2 px-4 py-2 my-2 rounded-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${showIconOnly ? 'group' : ''}`}
        onClick={toggleExpand}
      >
        {icon && <div className="w-6 h-6 flex justify-center items-center">{icon}</div>}
        {menuItems && menuItems.length > 0 && <Popup show={true} horizontalPosition="right" className="w-60 hidden group-hover:block top-14 -right-56" showArrow>
          <MenuItems menus={menuItems} className='text-sm font-semibold'/>
        </Popup>}
        {!showIconOnly && <div className="flex-grow font-medium text-base truncate">{text}</div>}
        {subitems && !showIconOnly && (
          <div className="w-6 h-6 ml-2">
            <DownArrowIcon className={`h-full ${expanded ? 'rotate-180' : ''}`} />
          </div>
        )}
      </div>

      {subitems && !showIconOnly &&
        <div className={`ml-6 my-2 border-l border-l-[#b3b2b2]  ${expanded
          ? 'h-auto'
          : 'h-0 hidden'} transition duration-300`}>
          {subitems?.map((subitem, index) => (
            <SidebarItem key={index} {...subitem} showIconOnly={showIconOnly} />
          ))}
        </div>
      }
    </Fragment>
  );
};

export default SidebarItem;