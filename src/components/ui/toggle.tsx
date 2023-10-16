import React, { useState } from "react";

const Toggle = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <label className="relative inline-flex cursor-pointer select-none items-center">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="sr-only"
        />

        <span
          className={`flex h-6 w-12 items-center rounded-full p-1 duration-200 ${
            isChecked ? "bg-neutral-500" : "bg-secondary"
          }`}
        >
          <span
            className={`h-[18px] w-[18px] rounded-full bg-white duration-200 ${
              isChecked ? "translate-x-[24px]" : ""
            }`}
          ></span>
        </span>
      </label>
    </>
  );
};

export default Toggle;
