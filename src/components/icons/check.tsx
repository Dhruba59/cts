import React from "react";

const Check = (props: React.SVGProps<SVGSVGElement>) => (
  <div className="flex flex-shrink-0 justify-center items-center p-0.5 w-5 h-5 rounded-full bg-[#ebfbe3]">
    <svg
      width={17}
      height={16}
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.8102 2.25H14.562C14.387 2.25 14.2209 2.33036 14.1138 2.46786L6.75128 11.7946L3.22092 7.32143C3.16752 7.25362 3.09944 7.1988 3.02182 7.16106C2.94419 7.12333 2.85902 7.10368 2.77271 7.10357H1.52449C1.40485 7.10357 1.33878 7.24107 1.41199 7.33393L6.30307 13.5304C6.53164 13.8196 6.97092 13.8196 7.20128 13.5304L15.9227 2.47857C15.9959 2.3875 15.9299 2.25 15.8102 2.25Z"
        fill="#52C41A"
      />
    </svg>
  </div>
);

export default Check;
