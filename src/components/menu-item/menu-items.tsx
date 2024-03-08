import React from 'react';
import MenuItem from './menu-item';
import { MenuListProps } from '@/model/menu-items';

const MenuList: React.FC<MenuListProps> = ({ menus, className }) => {
  return (
    <div className={className}>
      {menus.length > 0 ? menus?.map((menu, index) => (
        <MenuItem
          key={index}
          icon={menu?.icon}
          content={menu.content}
          url={menu.url}
          onClick={menu.onClick}
        />
      )) : <div className='w-16'>No Data</div>}
    </div>
  );
};

export default MenuList;
