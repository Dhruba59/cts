import { ReactNode } from "react";

export interface SidebarItemProps {
  icon?: ReactNode;
  text: string;
  subitems?: SidebarItemProps[];
  showIconOnly?: boolean;
};

export interface SidebarProps {
  items: SidebarItemProps[];
};