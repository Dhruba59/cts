import React, { useState } from 'react';

interface PopUpProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

const PopUp: React.FC<PopUpProps> = ({
  content,
  children,
  position = 'bottom',
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const popupClass = `absolute z-10 p-2 bg-white border primary-border dark:border-dark-border dark:bg-dark-lightBlue rounded-md ${className}`;
  const popupPositionClass =
    position === 'bottom'
      ? 'top-full left-0'
      : position === 'top'
      ? 'bottom-full left-0'
      : position === 'right'
      ? 'top-0 left-full'
      : position === 'left'
      ? 'top-0 right-full'
      : '';

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative inline-block"
    >
      {children}
      {isHovered && (
        <div className={`${popupClass} ${popupPositionClass}`}>
          {content}
        </div>
      )}
    </div>
  );
};

export default PopUp;