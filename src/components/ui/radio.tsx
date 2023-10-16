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
    <div className="flex items-center gap-2">
      <input
        type="radio"
        id={id}
        ref={inputRef}
        value={value}
        className={cn("accent-secondary h-4 w-4", className)}
        {...props}
      />
      <Label label={children} htmlFor={id} />
    </div>
  );
};

interface RadioGroupProps extends React.ComponentPropsWithoutRef<"div"> {
  children: any;
  name: string;
  selectedValue?: string | number;
}

const RadioGroup = ({
  children,
  name,
  onChange,
  selectedValue,
  ...props
}: RadioGroupProps) => {
  return (
    <div {...props}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { name, onChange, selectedValue })
      )}
    </div>
  );
};

export { RadioGroup, RadioButton };
