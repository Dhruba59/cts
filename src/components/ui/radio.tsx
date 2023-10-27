"use client";
import { cn } from "@/libs/utils";
import Label from "./label";
import React, { useEffect, useRef, useState } from "react";

interface RadioButtonProps extends React.ComponentPropsWithoutRef<"input"> {
  children: React.ReactNode;
  selectedValue?: string | number;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  id,
  value,
  className,
  children,
  selectedValue,
  onSelect,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const input = inputRef.current;
    if (input && value === selectedValue) {
      input.checked = true;
    }
  }, [selectedValue, value]);

  return (
    <div className='flex items-center gap-2'>
      <input
        type="radio"
        id={id}
        ref={inputRef}
        value={value}
        className={cn("accent-secondary h-4 w-4 cursor-pointer",  className)}
        {...props}
      />
      <Label label={children} htmlFor={id} className="cursor-pointer"/>
    </div>
  );
};

interface RadioGroupProps extends React.ComponentPropsWithoutRef<"div"> {
  children: any;
  label?: string;
  labelClassName?: string;
  name: string;
  selectedValue?: string | number;
  rootClassName?: string;
}

const RadioGroup = ({
  children,
  label,
  name,
  onChange,
  selectedValue,
  labelClassName,
  rootClassName,
  ...props
}: RadioGroupProps) => {
  return (
    <fieldset className={rootClassName}>
      {label && <Label label={label} className={`inline-block mb-3 ${labelClassName}`} />}
      <div {...props}>
        {React.Children.map(children, (child) =>
          React.cloneElement(child, { name, onChange, selectedValue })
        )}
      </div>
    </fieldset>
  );
};

export { RadioGroup, RadioButton };
