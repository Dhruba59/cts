import React, { useState } from "react";
import Label from "./label";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  prefixLabel?: string;
  suffixLabel?: string;
  disabled?: boolean;
  isChecked?: boolean;
  setIsChecked?: React.Dispatch<React.SetStateAction<boolean>>;
}
const Toggle = ({
  prefixLabel,
  suffixLabel,
  disabled = false,
  isChecked = false,
  setIsChecked,
  ...props
}: Props) => {
  const handleCheckboxChange = () => {
    setIsChecked && setIsChecked(!isChecked);
  };

  return (
    <div {...props}>
      <label className="relative inline-flex cursor-pointer select-none items-center">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="sr-only appearance-none hidden"
          disabled={disabled}
        />
        {prefixLabel && (
          <Label label={prefixLabel} className="mr-2" isDisabled={disabled} />
        )}
        <span
          className={`flex h-6 w-12 items-center rounded-full p-1 duration-200 ${
            isChecked ? "bg-secondary" : "bg-neutral-500"
          }`}
        >
          <span
            className={`h-[18px] w-[18px] rounded-full bg-white duration-200 ${
              isChecked ? "translate-x-[24px]" : ""
            }`}
          ></span>
        </span>
        {suffixLabel && <Label label={suffixLabel} className="ml-2" />}
      </label>
    </div>
  );
};

export default Toggle;
