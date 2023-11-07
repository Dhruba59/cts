import { DarkModeIcon, LightModeIcon } from '@/assets/icons';
import { useThemeContext } from '@/context/theme-context';
import { THEME_COLOR_ENUM } from '@/model/context';
import { DarkModeToggleProps } from '@/model/toggle';
import React from 'react';

const DarkModeToggleSwitch = ({ onChange, checked = false }: DarkModeToggleProps) => {
  const {theme, setTheme} = useThemeContext();
  const isDarkMode = theme === THEME_COLOR_ENUM.DARK;

  const toggleDarkMode = () => {
    onChange(!isDarkMode);
  };

  return (
    <div
      className={`relative flex items-center dark-mode-toggle ${isDarkMode ? 'bg-blue-500' : 'bg-gray-300'
        } rounded-full p-1 transition-colors`}
    >
      <label className="switch relative inline-block w-[52px] h-6 z-20 cursor-pointer">
        <input
          type="checkbox"
          onChange={toggleDarkMode}
          checked={isDarkMode}
          className="hidden"
        />
        <div
          className={`slider flex justify-center items-center round absolute cursor-pointer w-6 h-6 transition-transform ${isDarkMode ? 'translate-x-7' : 'translate-x-0'
            } bg-white rounded-full`}
        >
          {isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
        </div>
      </label>
    </div>);
};

export default DarkModeToggleSwitch;
