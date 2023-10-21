import { MenuItemProps } from '@/model/menu-items';
import React from 'react';

const MenuItem: React.FC<MenuItemProps> = ({ icon, text, href }) => {
  const content = href ? (
    <a href={href} className="flex items-center px-4 py-1 border-b border-gray-100 cursor-pointer transition-colors hover:bg-gray-50">
      {icon && <div className="w-6 h-6 mr-4">{icon}</div>}
      <div className="text-lg">{text}</div>
    </a>
  ) : (
    <div className="flex items-center px-4 py-1 border-b border-gray-100 cursor-pointer transition-colors hover:bg-gray-50">
      {icon && <div className="w-6 h-6 mr-4">{icon}</div>}
      <div className="text-lg">{text}</div>
    </div>
  );

  return content;
};

export default MenuItem;
