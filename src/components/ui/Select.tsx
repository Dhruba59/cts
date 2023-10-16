"use client";

import { KeyValueType } from "@/types/common";
import ReactSelect, { CSSObjectWithLabel } from "react-select";

interface SelectProps extends React.HTMLAttributes<HTMLDivElement> {
  options: KeyValueType[];
}

const Select: React.FC<SelectProps> = ({ options }: SelectProps) => {
  const customStyles = {
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected ? "#1890FF" : "#fff",
      "&:hover": {
        backgroundColor: !state.isSelected && "#DEF3FE",
      },
    }),

    control: (base: CSSObjectWithLabel, state: any) => ({
      ...base,
      fontSize: "14px",
      padding: "1.5px 3px",
      border: "1px solid #D9D9D9",
      boxShadow: "none",
      outline: state.isFocused ? "1px solid #1890FF" : "1px solid #fff",
      outlineOffset: state.isFocused ? "1px " : "1px",
      "&:hover": {
        border: "1px solid #D9D9D9",
      },
    }),
    singleValue: (base: CSSObjectWithLabel) => ({
      ...base,
      color: "#262626",
      fontSize: "14px",
    }),
    indicatorSeparator: () => ({ display: "none" }),
  };

  return (
    <div className="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary focus-visible:ring-offset-1">
      <ReactSelect
        options={options}
        styles={customStyles}
        id="long-value-select"
        instanceId="long-value-select"
      />
    </div>
  );
};

export default Select;
