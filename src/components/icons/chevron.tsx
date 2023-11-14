import React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {}

const Chevron = ({ ...props }: Props) => (
  <svg
    width={16}
    height={17}
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11.5279 10.9717C11.7883 11.2321 12.2104 11.2321 12.4708 10.9717C12.7311 10.7114 12.7311 10.2893 12.4708 10.0289L8.47075 6.02892C8.2104 5.76857 7.78829 5.76857 7.52794 6.02892L3.52795 10.0289C3.2676 10.2893 3.2676 10.7114 3.52795 10.9717C3.78829 11.2321 4.2104 11.2321 4.47075 10.9717L7.99935 7.44313L11.5279 10.9717Z"
      fill="#5C5E64"
    />
  </svg>
);

export default Chevron;
