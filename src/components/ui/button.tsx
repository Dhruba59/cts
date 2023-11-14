import { cn } from "@/libs/utils";
import { VariantProps, cva } from "class-variance-authority";
import React, { ButtonHTMLAttributes, FC, forwardRef } from "react";
import Spinner from "./spinner";

const buttonVariants = cva(
  `transition-all duration-300 rounded-[4px] inline-flex items-center justify-center font-medium shadow-main disabled:opacity-50 disabled:cursor-not-allowed`,
  {
    variants: {
      variant: {
        primary: "bg-primary text-white hover:bg-primary/90",
        secondary: "bg-secondary text-white hover:bg-secondary/90",
        outline:
          "bg-white text-primary hover:bg-white/90 border border-primary",
        ghost: "text-black/80 hover:text-black/70 shadow-none p-0 ",
      },
      size: {
        small: "h-[34px] text-sm px-4",
        large: "h-10 text-sm sm:text-base px-5",
      },
    },
    defaultVariants: {
      size: "large",
      variant: "primary",
    },
  }
);

interface Props {
  loading?: boolean;
}

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    Props,
    VariantProps<typeof buttonVariants> {
  ref?: React.Ref<HTMLButtonElement>;
}

const Button: FC<ButtonProps> = forwardRef(
  ({ size, variant, className, children, loading, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(buttonVariants({ className, variant, size }))}
        {...props}
      >
        <>
          {loading && <Spinner size="small" className="mr-1" />}
          {children}
        </>
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
