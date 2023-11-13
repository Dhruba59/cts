import React from "react";
interface Props extends React.SVGProps<SVGSVGElement> {}
const VerticalDots = ({ ...props }: Props) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M2.5 9.98047C2.5 10.1446 2.53233 10.3072 2.59515 10.4588C2.65797 10.6105 2.75004 10.7483 2.86612 10.8644C2.98219 10.9804 3.11999 11.0725 3.27165 11.1353C3.4233 11.1981 3.58585 11.2305 3.75 11.2305C3.91415 11.2305 4.0767 11.1981 4.22835 11.1353C4.38001 11.0725 4.51781 10.9804 4.63388 10.8644C4.74996 10.7483 4.84203 10.6105 4.90485 10.4588C4.96767 10.3072 5 10.1446 5 9.98047C5 9.81632 4.96767 9.65377 4.90485 9.50211C4.84203 9.35046 4.74996 9.21266 4.63388 9.09659C4.51781 8.98051 4.38001 8.88844 4.22835 8.82562C4.0767 8.7628 3.91415 8.73047 3.75 8.73047C3.58585 8.73047 3.4233 8.7628 3.27165 8.82562C3.11999 8.88844 2.98219 8.98051 2.86612 9.09659C2.75004 9.21266 2.65797 9.35046 2.59515 9.50211C2.53233 9.65377 2.5 9.81632 2.5 9.98047ZM8.75 9.98047C8.75 10.312 8.8817 10.6299 9.11612 10.8644C9.35054 11.0988 9.66848 11.2305 10 11.2305C10.3315 11.2305 10.6495 11.0988 10.8839 10.8644C11.1183 10.6299 11.25 10.312 11.25 9.98047C11.25 9.64895 11.1183 9.33101 10.8839 9.09659C10.6495 8.86216 10.3315 8.73047 10 8.73047C9.66848 8.73047 9.35054 8.86216 9.11612 9.09659C8.8817 9.33101 8.75 9.64895 8.75 9.98047ZM15 9.98047C15 10.312 15.1317 10.6299 15.3661 10.8644C15.6005 11.0988 15.9185 11.2305 16.25 11.2305C16.5815 11.2305 16.8995 11.0988 17.1339 10.8644C17.3683 10.6299 17.5 10.312 17.5 9.98047C17.5 9.64895 17.3683 9.33101 17.1339 9.09659C16.8995 8.86216 16.5815 8.73047 16.25 8.73047C15.9185 8.73047 15.6005 8.86216 15.3661 9.09659C15.1317 9.33101 15 9.64895 15 9.98047Z"
      fill="black"
      fillOpacity="0.85"
    />
  </svg>
);

export default VerticalDots;
