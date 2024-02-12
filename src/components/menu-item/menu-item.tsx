import { MenuItemProps } from '@/model/menu-items';
import React from 'react';
import Link from 'next/link'

const MenuItem: React.FC<MenuItemProps> = ({ icon, text, url, onClick }) => {
  const content = url ? (
    <Link href={`/${url}`} onClick={onClick} className="flex items-center px-4 py-1 border-b border-gray-100 cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-slate-700">
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
