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
          <div className=" bg-white p-2 rounded-lg shadow-lg">
            {children}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Close
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Popup;
