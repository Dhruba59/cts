"use client";
import { cn } from "@/libs/utils";
import React, { HTMLProps, useRef } from "react";
import Label from "./label";

interface CheckboxProps extends React.ComponentPropsWithoutRef<"input"> {
  children?: React.ReactNode;
  indeterminate?: boolean;
  rootClassName?: string;
  labelClassName?: string;
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

const Checkbox = ({
  id,
  className,
  rootClassName,
  children,
  indeterminate,
  labelClassName,
  ...props
}: CheckboxProps) => {
  const ref = useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !props.checked && indeterminate;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, indeterminate]);

  return (
    <div className={`flex gap-2 items-center ${rootClassName}`}>
      <input
        type="checkbox"
        id={id}
        className={cn(
          "accent-secondary w-[12px] h-[12px] border-2 rounded-sm cursor-pointer",
          className
        )}
        {...props}
      />
      <Label label={children} htmlFor={id} className={labelClassName} />
    </div>
  );
};

export default Checkbox;

// Mainly optimized for table component
export function IndeterminateCheckbox({
  indeterminate,
  className,
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate, rest.checked]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={cn(
        "!h-4 !w-4 accent-secondary cursor-pointer bg-red-400 flex items-center justify-center",
        className
      )}
      {...rest}
    />
  );
}
