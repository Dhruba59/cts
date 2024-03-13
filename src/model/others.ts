import { ReactNode } from "react";

export interface DesktopSearchBarProps {
  title: string;
  searchFormContents: ReactNode;
  advanceSearchFormContents?: ReactNode;
  onReset: () => void;
}

export interface DesktopSearchFormProps {
  formContent: ReactNode;
  isAdvancedOpen: boolean;
  onReset: () => void;
}