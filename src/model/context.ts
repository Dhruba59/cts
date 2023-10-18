import { Dispatch, ReactNode, SetStateAction } from "react";

export interface SidebarContextType {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export interface SidebarContextProviderProps {
  children: ReactNode;
}