import ReactDatepicker, { DatepickerType } from "react-tailwindcss-datepicker";
import { cn } from "@/libs/utils";
import Label from "./label";
import { ReactNode } from "react";

interface Props extends DatepickerType {
  label?: string;
  customLevel?: ReactNode;
}

const Datepicker = ({
  displayFormat = "DD-MMM-YYYY",
  separator = "⇀",
  containerClassName,
  inputClassName,
  label,
  customLevel,
  ...props
}: Props) => {
  return (
    <div>
      {label && <Label label={label} className="inline-block mb-2" />}
      {customLevel}
      <ReactDatepicker
        {...props}
        displayFormat={displayFormat}
        separator={separator}
        containerClassName={cn(
          "rounded-[4px] w-full relative",
          containerClassName
        )}
        inputClassName={cn(
          "w-full h-10 px-3 rounded-[4px] dark:bg-dark-inputField border border-neutral-500 dark:border-dark-border focus-visible:outline-none focus-visible:ring-secondary focus-visible:ring-[0.5px] text-black/90 dark:text-white/80 text-sm",
          inputClassName
        )}
      />
    </div>
  );
};

export default Datepicker;
