import React, { ComponentPropsWithoutRef } from "react";
import Input from "../ui/input";
import Search from "../icons/search";
import { cn } from "@/libs/utils";

interface Props extends ComponentPropsWithoutRef<"input"> {
  wrapperClassName?: string;
}

const SearchBox = ({ className, wrapperClassName, ...props }: Props) => {
  return (
    <div className={cn("relative", wrapperClassName)}>
      <Input
        placeholder="Search"
        className={cn("pl-8", className)}
        {...props}
      />
      <Search className="absolute top-1/2 -translate-y-1/2 left-2" />
    </div>
  );
};

export default SearchBox;
