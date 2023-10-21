export interface MenuListProps {
  menus: Array<{ icon: string; text: string; href?: string }>;
}

export interface MenuItemProps {
  icon: string;
  text: string;
  href?: string; // Optional href prop for the link
}