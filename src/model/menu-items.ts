import { Dispatch, ReactNode, SetStateAction } from "react";

export interface MenuListProps {
  menus: Array<{ icon: string; text: string; href?: string; onClick?: () => void; }>;
  className?: string;
}

export interface MenuItemProps {
  icon: string;
  text: string;
  href?: string;
  onClick?: () => void;
}

export interface MenuItemsContextType {
  items: MenuItem[];
  setItems: Dispatch<SetStateAction<MenuItem[]>>;
}

export interface MenuItem {
  screenId: number;
  name: string;
  funtionality: string;
  url: string;
  parentScreenId: number;
  description: string;
  child: Array<MenuItem>;
  icon?: ReactNode;
}