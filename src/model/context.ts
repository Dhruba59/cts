import { Dispatch, ReactNode, SetStateAction } from "react";

export interface SidebarContextType {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
  isSidebarMinimize: boolean;
  setIsSidebarMinimize: Dispatch<SetStateAction<boolean>>;
}

export interface SidebarContextProviderProps {
  children: ReactNode;
}

export enum THEME_COLOR_ENUM {
  DARK = 'dark',
  LIGHT = 'light'
}

export interface ThemeContextProviderProps {
  children: ReactNode;
}

export interface ThemeContextValueType {
  theme: THEME_COLOR_ENUM;
  setTheme: Dispatch<SetStateAction<THEME_COLOR_ENUM>>;
}