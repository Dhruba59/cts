// icon:cross | System UIcons https://systemuicons.com/ | Corey Ginnivan
import * as React from "react";

function Cross(props: React.SVGProps<SVGSVGElement>) {
  return (
    <div className="flex flex-shrink-0 justify-center items-center p-0.5 w-5 h-5 rounded-full bg-[#ffe5e6]">
    <svg
      viewBox="0 0 21 21"
      fill="none"
      height="1em"
      width="1em"
      {...props}
    >
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15.5 15.5l-10-10zM15.5 5.5l-10 10"  fill="#EC1C24"/>
      </g>
    </svg>
    </div>
  );
}

  
export default Cross;
