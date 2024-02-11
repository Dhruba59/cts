import React from "react";
import { cn } from "@/libs/utils";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  label: string | number | React.ReactNode;
  span?: string | number | React.ReactNode
  isRequired?: boolean;
  isDisabled?: boolean;

}

const Label = ({
  label,
  span,
  isRequired,
  isDisabled,
  className,
  ...props
}: LabelProps) => {
  return (
    <label
      {...props}
      className={cn(
        "text-sm w-fit",
        { "text-neutral-600 dark:text-neutral-700": isDisabled },
        className
      )}
    >
      {isRequired && <span className="text-danger mr-1">*</span>}
      {label}{span}
    </label>
  );
};

export default Label;
