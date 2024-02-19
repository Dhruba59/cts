import { cn } from "@/libs/utils";
import React, { HTMLProps } from "react";

export interface Props extends HTMLProps<HTMLAnchorElement> {
  active?: boolean;
}

const PageLink = ({
  className,
  children,
  disabled,
  active,
  ...props
}: Props) => {
  const customClassName = cn(
    "inline-flex text-xs md:text-base h-7 w-7 md:h-9 md:w-9 border rounded-sm border-neutral-500  text-black/80 items-center justify-center mx-1 hover:bg-neutral-100 dark:hover:bg-bg dark:bg-dark-lightBlue dark:text-white/80 cursor-pointer",
    className,
    {
      "border-secondary text-secondary": active,
      "bg-neutral-500 cursor-not-allowed": disabled,
    }
  );
  if (disabled) {
    return <span className={`${customClassName}`}>{children}</span>;
  }

  return (
    <a
      aria-current={active ? "page" : undefined}
      {...props}
      className={`${customClassName} `}
    >
      {children}
    </a>
  );
};

export default PageLink;
