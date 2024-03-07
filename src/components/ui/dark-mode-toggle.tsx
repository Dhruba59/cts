import { DarkModeIcon, LightModeIcon } from '@/assets/icons';
import { STORAGE_KEY } from '@/constants/storage-constant';
import { useThemeContext } from '@/context/theme-context';
import { THEME_COLOR_ENUM } from '@/model/context';
import { DarkModeToggleProps } from '@/model/toggle';
import React, { useEffect } from 'react';

const DarkModeToggleSwitch = ({ onChange, checked = false, iconClassName, containerClassName, inputClassName }: DarkModeToggleProps) => {
  const {theme, setTheme} = useThemeContext();
  const isDarkMode = theme === THEME_COLOR_ENUM.DARK;

  const toggleDarkMode = () => {
    /* 
      As its already in darkmode so when it is in darkmode toggling to lightmode
    */
    if (!isDarkMode) { 
      document.documentElement.classList.add(THEME_COLOR_ENUM.DARK);
      localStorage.setItem(STORAGE_KEY.THEME, THEME_COLOR_ENUM.DARK);
      // setIsDark(true);
      setTheme(THEME_COLOR_ENUM.DARK);
    } else {
      document.documentElement.classList.remove(THEME_COLOR_ENUM.DARK);
      localStorage.removeItem(STORAGE_KEY.THEME);
      // setIsDark(false);
      setTheme(THEME_COLOR_ENUM.LIGHT);
    }
  };

  
  useEffect(() => {
    if (
      localStorage.getItem(STORAGE_KEY.THEME) &&
      localStorage.getItem(STORAGE_KEY.THEME) === THEME_COLOR_ENUM.DARK
    ) {
      document.documentElement.classList.add(THEME_COLOR_ENUM.DARK);
      setTheme(THEME_COLOR_ENUM.DARK);
    } else {
      document.documentElement.classList.remove(THEME_COLOR_ENUM.DARK);
      setTheme(THEME_COLOR_ENUM.LIGHT);
    }
    
    
  }, []);

  return (
    <div
      className={`relative flex items-center dark-mode-toggle ${isDarkMode ? 'bg-blue-500' : 'bg-gray-300'
        } rounded-full p-1 transition-colors ${containerClassName}`}
    >
      <label className={`switch relative inline-block w-[52px] h-6 z-20 cursor-pointer ${inputClassName}`}>
        <input
          type="checkbox"
          onChange={toggleDarkMode}
          checked={isDarkMode}
          className="hidden"
        />
        <div
          className={`slider flex justify-center items-center round absolute cursor-pointer w-6 h-6 transition-transform ${isDarkMode ? 'translate-x-7' : 'translate-x-0'
            } bg-white rounded-full ${iconClassName}`}
        >
          {isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
        </div>
      </label>
    </div>);
};

export default DarkModeToggleSwitch;
