import { ReactNode } from "react";

export interface PopupProps {
  show: boolean;
  onClose?: () => void;
  showCloseButton?: boolean;
  horizontalPosition?: 'left' | 'center' | 'right';
  verticalPosition?: 'top' | 'center' | 'bottom';
  children: ReactNode;
  className?: string;
  showArrow?: boolean;
}