'use client';
import { SidebarContextProviderProps, SidebarContextType } from "@/model/context";
import { createContext, useContext, useEffect, useState } from "react";

const SidebarContext = createContext<SidebarContextType>(null!);

export const SidebarContextProvider = ({ children }: SidebarContextProviderProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isSidebarMinimize, setIsSidebarMinimize] = useState<boolean>(false);
  useEffect(() => {
    if (window && window.innerWidth < 768) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, []);

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen, isSidebarMinimize, setIsSidebarMinimize }}>
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('Use sidebar context inside the Sidebar Context!');
  }
  return context;
}
