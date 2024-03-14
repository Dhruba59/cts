import { MenuItemProps } from '@/model/menu-items';
import React from 'react';
import { useRouter } from 'next/navigation';

const menuStyle = {
  base: "flex items-center px-4 py-1 border-b border-primary-border dark:border-dark-border cursor-pointer transition-colors",
  enabled: "hover:bg-gray-50 dark:hover:bg-slate-700",
  disabled: "opacity-50 !cursor-not-allowed",
};

const MenuItem: React.FC<MenuItemProps> = ({ icon, content, url, onClick, disabled }) => {
  const router = useRouter();

  const handleClick = () => {
    if (!disabled) {
      if (onClick) {
        onClick();
      }
      if (url) {
        router.push(`/${url}`);
      }
    }
  };

  const menu = (
    <div onClick={handleClick} className={`${menuStyle.base} ${disabled ? menuStyle.disabled : menuStyle.enabled}`}>
      {icon && <div className="w-6 h-6 mr-4">{icon}</div>}
      <div className='w-full'>{content}</div>
    </div>
  );

  return menu;
};

export default MenuItem;
