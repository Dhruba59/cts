"use client";
import { cn } from "@/libs/utils";
import { ComponentPropsWithoutRef } from "react";

interface Props extends ComponentPropsWithoutRef<"div"> {
  minValue: number;
  maxValue: number;
}

const InputRange = ({ minValue, maxValue, className, ...props }: Props) => {
  return (
    <div
      className={cn(
        "px-3 h-10 rounded-[4px] border border-neutral-500 flex items-center gap-4 w-fit text-black/90",
        className
      )}
      {...props}
    >
      <input
        placeholder="Min"
        type="number"
        className="w-16 text-sm text-center focus-visible:outline-none bg-transparent"
        min={minValue}
      />
      <span className="text-neutral-400"> ⇀</span>
      <input
        placeholder="Max"
        type="number"
        className="w-16 text-sm text-center focus-visible:outline-none bg-transparent"
        max={maxValue}
      />
    </div>
  );
};

export default InputRange;
