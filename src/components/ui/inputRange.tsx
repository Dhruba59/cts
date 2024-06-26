// InputRange component

import React from 'react';
import { cn } from "@/libs/utils";
import { ComponentPropsWithoutRef, ChangeEvent } from "react";

interface Props extends ComponentPropsWithoutRef<"div"> {
  values?: { minValue: number; maxValue: number };
  onValuesChange?: (newValues: { minValue: number; maxValue: number }) => void;
  minInputProps?: ComponentPropsWithoutRef<'input'>;
  maxInputProps?: ComponentPropsWithoutRef<'input'>;
}

const InputRange = ({ values={minValue: 0, maxValue: 100}, onValuesChange, className, minInputProps, maxInputProps, ...props }: Props) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>, key: string) => {
    const newValue = parseInt(event.target.value, 10);
    onValuesChange?.({ ...values, [key]: newValue });
  };

  return (
    <div
      className={cn(
        "px-3 h-10 rounded-[4px] border border-neutral-500 dark:border-dark-border flex items-center gap-4 w-fit text-black/90 dark:text-white/80 dark:bg-dark-inputField",
        className
      )}
    >
      <input
        placeholder='min'
        type="number"
        className="w-full max-w-[60px] text-sm text-center focus-visible:outline-none bg-transparent"
        // value={values.minValue}
        onChange={(e) => handleInputChange(e, 'minValue')}
        {...minInputProps}
      />
      <span className="text-neutral-500"> ⇀</span>
      <input
        placeholder='max'
        type="number"
        className="w-full max-w-[60px] text-sm text-center focus-visible:outline-none bg-transparent"
        // value={values.maxValue}
        onChange={(e) => handleInputChange(e, 'maxValue')}
        {...maxInputProps}
      />
    </div>
  );
};

export default InputRange;
