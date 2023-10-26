'use client';
import { THEME_COLOR_ENUM, ThemeContextProviderProps, ThemeContextValueType } from "@/model/context";
import { createContext, useContext, useState } from "react";

export const ThemeContext = createContext<ThemeContextValueType>(null!);

export const ThemeContextProvider = ({children }: ThemeContextProviderProps) => {
  const [themeColor, setThemeColor] = useState<THEME_COLOR_ENUM>(THEME_COLOR_ENUM.LIGHT);

  return (
    <ThemeContext.Provider value={{themeColor, setThemeColor}}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if(!context) {
    throw new Error('Use theme context inside its provider!');
  }
  return context;
}