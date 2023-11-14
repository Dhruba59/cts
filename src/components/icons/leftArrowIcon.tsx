import React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {}

const LeftArrowIcon = ({ width, height, ...props }: Props) => (
  <svg
    width={width ?? 10}
    height={height ?? 10}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.83986 2.06646V1.03119C8.83986 0.941456 8.73674 0.891902 8.6671 0.946813L2.6296 5.66244C2.5783 5.70233 2.53679 5.75341 2.50824 5.81179C2.47969 5.87016 2.46484 5.93429 2.46484 5.99927C2.46484 6.06425 2.47969 6.12838 2.50824 6.18675C2.53679 6.24512 2.5783 6.29621 2.6296 6.3361L8.6671 11.0517C8.73808 11.1066 8.83986 11.0571 8.83986 10.9673V9.93208C8.83986 9.86646 8.80906 9.80351 8.75817 9.76333L3.93674 5.99994L8.75817 2.23521C8.80906 2.19503 8.83986 2.13208 8.83986 2.06646Z"
      fill="black"
      fillOpacity="0.85"
    />
  </svg>
);

export default LeftArrowIcon;