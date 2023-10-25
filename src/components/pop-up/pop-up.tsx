import { PopupProps } from '@/model/pop-up';
import React, { useEffect, useRef } from 'react';

const Popup: React.FC<PopupProps> = ({
  show,
  onClose,
  showCloseButton,
  horizontalPosition = 'center',
  verticalPosition = 'center',
  children,
  className,
  showArrow
}) => {
  const popupRef = useRef(null);

  const getHorizontalPositionClass = () => {
    switch (horizontalPosition) {
      case 'left':
        return 'left-0 -translate-x-full';
      case 'right':
        return 'right-0';
      case 'center':
      default:
        return 'left-1/2 transform -translate-x-1/2';
    }
  };

  const getVerticalPositionClass = () => {
    switch (verticalPosition) {
      case 'top':
        return 'top-0 -translate-y-full';
      case 'bottom':
        return 'bottom-0 translate-y-2/3';
      case 'center':
      default:
        return 'top-1/2 transform -translate-y-1/2';
    }
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (popupRef.current && !(popupRef.current as any).contains(e.target)) {
      onClose && onClose();
    }
  };

  useEffect(() => {
    if (show) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [show]);

  return (
    <div className={`absolute flex items-center justify-center z-50 ${className}`}>
      <div ref={popupRef} className={` ${getHorizontalPositionClass()} ${getVerticalPositionClass()}`}>
        {show && (
          <div className="bg-white dark:bg-neutral-black p-2 rounded-lg shadow-xl relative">
            {showCloseButton && (
              <button
                onClick={onClose}
                className="absolute top-0 right-0 p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
              >
                Close
              </button>
            )}
            {showArrow &&
              <div className="w-4 h-4 rotate-45 bg-white dark:bg-neutral-black absolute top-2 left-0 z-40 transform -translate-x-1/2"
              ></div>}
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default Popup;
