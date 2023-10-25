import { Dispatch, ReactNode, SetStateAction } from "react";

export interface SidebarContextType {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
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
  themeColor: THEME_COLOR_ENUM;
  setThemeColor: Dispatch<SetStateAction<THEME_COLOR_ENUM>>;
}