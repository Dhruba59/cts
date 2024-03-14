import { Dispatch, ReactNode, SetStateAction } from "react";

export interface MenuListProps {
  menus: Array<MenuItemProps>;
  className?: string;
}

export interface MenuItemProps {
  icon?: string;
  content: string | ReactNode;
  url?: string;
  onClick?: () => void;
  disabled?: boolean;
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