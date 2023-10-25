import { DarkModeIcon, LightModeIcon } from '@/assets/icons';
import { STORAGE_CONSTANT } from '@/constants/storage-constant';
import { THEME_COLOR_ENUM } from '@/model/context';
import { DarkModeToggleProps } from '@/model/toggle';
import React, { useEffect, useState } from 'react';

const DarkModeToggleSwitch = ({ onChange, checked = false }: DarkModeToggleProps) => {
  const [isDarkMode, setIsDarkMode] = useState(checked);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    onChange(!isDarkMode);
  };

  useEffect(() => {
    if (localStorage.getItem(STORAGE_CONSTANT.THEME) && localStorage.getItem(STORAGE_CONSTANT.THEME) === THEME_COLOR_ENUM.DARK) {
      document.documentElement.classList.add(THEME_COLOR_ENUM.DARK);
    } else {
      document.documentElement.classList.remove(THEME_COLOR_ENUM.DARK);
    }
  }, [])

  return (
    <div
      className={`relative flex items-center dark-mode-toggle ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
        } rounded-full p-1 transition-colors`}
    >
      <label className="switch relative inline-block w-[52px] h-5 z-20 cursor-pointer">
        <input
          type="checkbox"
          onChange={toggleDarkMode}
          checked={isDarkMode}
          className="hidden"
        />
        <div
          className={`slider flex justify-center items-center round absolute cursor-pointer w-6 h-5 transition-transform ${isDarkMode ? 'translate-x-7' : 'translate-x-0'
            } bg-white rounded-full`}
        >
          {isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
        </div>
      </label>
    </div>);
};

export default DarkModeToggleSwitch;
