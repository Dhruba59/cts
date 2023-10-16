import { cn } from "@/libs/utils";
import React from "react";
import Label from "./label";

interface CheckboxProps extends React.ComponentPropsWithoutRef<"input"> {
  children: React.ReactNode;
}

interface CheckboxGroupProps extends React.ComponentPropsWithoutRef<"div"> {
  options: any[];
}

export const CheckboxGroup = ({ options, ...props }: CheckboxGroupProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      console.log(e.target.value);
    }
  };

  return (
    <div {...props}>
      {options.map((option, index) => (
        <Checkbox
          key={index}
          id={option?.label}
          onChange={handleChange}
          value={option?.value}
        >
          {option?.label}
        </Checkbox>
      ))}
    </div>
  );
};

const Checkbox = ({ id, className, children, ...props }: CheckboxProps) => {
  return (
    <div className="flex gap-2 items-center">
      <input
        type="checkbox"
        id={id}
        className={cn(
          "accent-secondary w-4 h-4 border-2 rounded-sm",
          className
        )}
        {...props}
      />
      <Label label={children} htmlFor={id} />
    </div>
  );
};

export default Checkbox;
