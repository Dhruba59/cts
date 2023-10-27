import React from "react";
import { cn } from "@/libs/utils";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  label: string | number | React.ReactNode;
  isRequired?: boolean;
}

const Label = ({ label, isRequired, className, ...props }: LabelProps) => {
  return (
    <label {...props} className={cn("text-black/90 text-sm w-fit", className)}>
      {isRequired && <span className="text-danger mr-1">*</span>}
      {label}
    </label>
  );
};

export default Label;