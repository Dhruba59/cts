export interface DarkModeToggleProps {
  onChange?: (isDark: boolean) => void;
  checked?: boolean;
  inputClassName?: string;
  containerClassName?: string;
  iconClassName?: string;
}