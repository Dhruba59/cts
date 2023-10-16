import { cn } from "@/libs/utils";
import * as React from "react";
import Label from "./label";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, required, ...props }, ref) => {
    return (
      <div>
        {label && (
          <Label
            label={label}
            isRequired={required}
            className="inline-block mb-2"
          />
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-[4px] border border-neutral-500 bg-background px-3 py-2 text-sm disabled:cursor-not-allowed placeholder:text-black/25 text-neutral-black disabled:opacity-50 outline-none flex-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary focus-visible:ring-offset-1",
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

export { Input };
