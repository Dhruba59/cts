import * as React from "react";

import { cn } from "@/libs/utils";
import Label from "./label";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  wrapperClassName?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({className, label, required, wrapperClassName, ...props }, ref) => {
    return (
      <div className={wrapperClassName}>
        {/* {label && 
        <Label label={label} className="inline-block mb-2" />} */}
        {label && (
          <Label
            label={label}
            isRequired={required}
            className="inline-block mb-2"
          />
        )}
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-sm bg-white border-neutral-500 dark:border-dark-border dark:bg-dark-inputField border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export default Textarea;
