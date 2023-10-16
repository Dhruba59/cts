import { cn } from "@/libs/utils";
import React from "react";

interface Props {
  size?: "small" | "middle" | "large";
  className?: string;
}

const Spinner = ({ size = "middle", className }: Props) => {
  return (
    <>
      <div
        className={cn(
          "border-neutral-100 animate-spin rounded-full  border-t-primary",
          {
            "w-3.5 h-3.5 border": size === "small",
            "w-5 h-5 border-2": size === "middle",
            "w-10 h-10 border-4": size === "large",
          },
          className
        )}
      />
    </>
  );
};

export default Spinner;
