import { CSSObjectWithLabel } from "react-select";

export const customStyles = {
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
