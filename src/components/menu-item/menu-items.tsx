import React from 'react';
import MenuItem from './menu-item';
import { MenuListProps } from '@/model/menu-items';

const MenuList: React.FC<MenuListProps> = ({ menus, className }) => {
  return (
    <div className={className}>
      {menus?.map((menu, index) => (
        <MenuItem
          key={index}
          icon={menu.icon}
          text={menu.text}
          url={menu.url}
          onClick={menu.onClick}
        />
      ))}
    </div>
  );
};

export default MenuList;
