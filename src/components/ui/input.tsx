import { cn } from "@/libs/utils";
import * as React from "react";
import Label from "./label";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  span?: string | number | React.ReactNode
  wrapperClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, span, required, wrapperClassName, ...props }, ref) => {
    return (
      <div className={wrapperClassName}>
        {label && (
          <Label
            label={label}
            span={span}
            isRequired={required}
            className="inline-block mb-2"
          />
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-[4px] border border-neutral-500 dark:border-dark-border dark:bg-dark-inputField dark:text-white/80 bg-background px-3 py-2 text-sm disabled:cursor-not-allowed placeholder:text-black/25 dark:placeholder:text-white/40 text-neutral-black disabled:opacity-50 outline-none flex-1 focus-visible:outline-none focus-visible:ring-secondary focus-visible:ring-[0.5px]",
            className
          )}
          ref={ref}
          required={required}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export default Input;
