export interface MenuListProps {
  menus: Array<{ icon: string; text: string; href?: string }>;
  className?: string;
}

export interface MenuItemProps {
  icon: string;
  text: string;
  href?: string;
}