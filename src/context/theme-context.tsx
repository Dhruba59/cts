'use client';
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";

enum THEME_COLOR_ENUM {
  DARK = 'dark',
  DEFAULT = 'default'
}

interface ThemeContextProviderProps {
  children: ReactNode;
}

interface ThemeContextValueType {
  themeColor: THEME_COLOR_ENUM;
  setThemeColor: Dispatch<SetStateAction<THEME_COLOR_ENUM>>;
}

const ThemeContext = createContext<ThemeContextValueType>(null!);

export const ThemeContextProvider = ({children}: ThemeContextProviderProps) => {
  const [themeColor, setThemeColor] = useState<THEME_COLOR_ENUM>(THEME_COLOR_ENUM.DEFAULT);

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