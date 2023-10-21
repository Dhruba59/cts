import React from 'react';
import MenuItem from './menu-item';
import { MenuListProps } from '@/model/menu-items';

const MenuList: React.FC<MenuListProps> = ({ menus }) => {
  return (
    <div>
      {menus.map((menu, index) => (
        <MenuItem
          key={index}
          icon={menu.icon}
          text={menu.text}
          href={menu.href}
        />
      ))}
    </div>
  );
};

export default MenuList;
