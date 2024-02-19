import { cn } from "@/libs/utils";
import * as React from "react";
import Label from "./label";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  wrapperClassName?: string;
  regex: RegExp;
  maxLength: number;
  value?: string;
}

const InputFieldWithRegexValidation = React.forwardRef<HTMLInputElement, InputProps>(
  ({maxLength, value, regex, onChange, className, type, label, required, wrapperClassName, ...props }, ref) => {

    const [inputValue, setInputValue] = React.useState('');

    console.log('regex',value);

    const handleInputChange = (e: any) => {
      const tmpValue = e.target.value;
      console.log('regex', tmpValue)
      // Check if the input matches the supported characters
      if (regex.test(tmpValue)) {
        // Limit the input to the specified maxLength
        if (tmpValue.length <= maxLength) {
          setInputValue(tmpValue);
          onChange?.(e);
        }
      }
    };

    React.useEffect(() => {
      setInputValue(value ?? '');
    }, [value])

    return (
      <div className={wrapperClassName}>
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
            "flex h-10 w-full rounded-[4px] border border-neutral-500 dark:bg-dark-inputField dark:text-white/80 bg-background px-3 py-2 text-sm disabled:cursor-not-allowed placeholder:text-black/25 dark:placeholder:text-white/40 text-neutral-black disabled:opacity-50 outline-none flex-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary focus-visible:ring-offset-1",
            className
          )}
          ref={ref}
          required={required}
          value={inputValue}
          onChange={handleInputChange}    
          {...props}
        />
      </div>
    );
  }
);
InputFieldWithRegexValidation.displayName = "Input";

export default InputFieldWithRegexValidation;
