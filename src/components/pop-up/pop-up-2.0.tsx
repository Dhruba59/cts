import React, { useState } from 'react';

interface PopUpProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
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
  let popupPositionClass = '';

  switch (position) {
    case 'bottom':
      popupPositionClass = 'top-full left-0';
      break;
    case 'top':
      popupPositionClass = 'bottom-full left-0';
      break;
    case 'right':
      popupPositionClass = 'top-0 left-full';
      break;
    case 'left':
      popupPositionClass = 'top-0 right-full';
      break;
    case 'top-left':
      popupPositionClass = 'bottom-full left-0';
      break;
    case 'top-right':
      popupPositionClass = 'bottom-full right-0';
      break;
    case 'bottom-left':
      popupPositionClass = 'top-full left-0';
      break;
    case 'bottom-right':
      popupPositionClass = 'top-full right-0';
      break;
    case 'top-center':
      popupPositionClass = 'bottom-full left-1/2 transform -translate-x-1/2';
      break;
    case 'bottom-center':
      popupPositionClass = 'top-full left-1/2 transform -translate-x-1/2';
      break;
    default:
      break;
  }

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
