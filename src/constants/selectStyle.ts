import { CSSObjectWithLabel } from "react-select";

export const getReactSelectCustomStyles = (isDarkMode: boolean) => {
  return ({
      option: (base: any, state: any) => ({
        ...base,
        color: isDarkMode ? "#fff" : "#24303f", 
        backgroundColor: state.isSelected ? '#1890FF' : isDarkMode ? "#24303f" : "#fff", 
        "&:hover": {
          backgroundColor: isDarkMode ? "#121212" : "#DEF3FE",
        },
      }),

      input: (base: any) => ({
        ...base,
        color: isDarkMode ? "#fff" : "#24303f",
      }),
    
      control: (base: CSSObjectWithLabel, state: any) => ({
        ...base,
        margin: '0px',
        fontSize: "14px",
        padding: "1.5px 3px",
        border: `1px solid ${isDarkMode ? '#3d4d60' : '#D9D9D9'}`,
        borderColor: '#363a3e',
        boxShadow: "none",
        // outline: state.isFocused ? "1px solid #1890FF" : "1px solid #fff",
        // outlineOffset: state.isFocused ? "1px " : "1px",
        backgroundColor: isDarkMode ? "#1d2a39" : "#fff", 
        "&:hover": {
          border: "1px solid #1e609f"
        },
      }),
      singleValue: (base: CSSObjectWithLabel) => ({
        ...base,
        color: isDarkMode ? "#E6E6E6" : "#262626", 
        fontSize: "14px",
      }),
      indicatorSeparator: () => ({ display: "none" }),
      placeholder: (base: CSSObjectWithLabel) => ({
        ...base,
        color: isDarkMode ? "#88909c" : "#999", // Change the color as needed
        fontSize: "14px",
      }),
    
    }
  )
}

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
