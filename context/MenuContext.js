"use client";
import { createContext, useState } from "react";

export const MenuContext = createContext();

const MenuContextProvider = ({ children }) => {
  const [open, setOpen] = useState(true);
  const toggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <MenuContext.Provider value={{ open, toggle }}>
      {children}
    </MenuContext.Provider>
  );
};

export default MenuContextProvider;
