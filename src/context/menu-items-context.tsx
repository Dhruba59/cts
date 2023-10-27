'use client';
import { SidebarContextProviderProps, SidebarContextType } from "@/model/context";
import { MenuItem, MenuItemsContextType } from "@/model/menu-items";
import { createContext, useContext, useEffect, useState } from "react";

const MenuItemsContext = createContext<MenuItemsContextType>(null!);

export const MenuItemsContextProvider = ({children}: SidebarContextProviderProps) => {
  const [items, setItems] = useState<MenuItem[]>([]);
  return (
    <MenuItemsContext.Provider value={{items, setItems}}>
      {children}
    </MenuItemsContext.Provider>
  );
}

export const useMenuItemsContext = () => {
  const context = useContext(MenuItemsContext);
  if(!context) {
    throw new Error('Use sidebar context inside the Sidebar Context!');
  }
  return context;
}
