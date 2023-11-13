import ReactDatepicker, { DatepickerType } from "react-tailwindcss-datepicker";
import { cn } from "@/libs/utils";
import Label from "./label";

interface Props extends DatepickerType {
  label?: string;
}

const Datepicker = ({
  displayFormat = "DD/MM/YYYY",
  separator = "⇀",
  containerClassName,
  inputClassName,
  label,
  ...props
}: Props) => {
  return (
    <div>
      {label && <Label label={label} className="inline-block mb-2" />}
      <ReactDatepicker
        {...props}
        displayFormat={displayFormat}
        separator={separator}
        containerClassName={cn(
          "rounded-[4px] w-full relative",
          containerClassName
        )}
        inputClassName={cn(
          "w-full h-10 px-3 rounded-[4px] border border-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary focus-visible:ring-offset-1 text-black/90 text-sm",
          inputClassName
        )}
      />
    </div>
  );
};

export default Datepicker;
