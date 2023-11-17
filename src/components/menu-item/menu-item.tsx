import { MenuItemProps } from '@/model/menu-items';
import Link from 'next/link';
import React from 'react';

const MenuItem: React.FC<MenuItemProps> = ({ icon, text, href, onClick }) => {
  const content = href ? (
    <Link href={href} onClick={onClick} className="flex items-center px-4 py-1 border-b border-gray-100 cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-slate-700">
      {icon && <div className="w-6 h-6 mr-4">{icon}</div>}
      <div>{text}</div>
    </Link>
  ) : (
    <div onClick={onClick} className="flex items-center px-4 py-1 border-b border-gray-100 cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-slate-700">
      {icon && <div className="w-6 h-6 mr-4">{icon}</div>}
      <div>{text}</div>
    </div>
  );

  return content;
};

export default MenuItem;
