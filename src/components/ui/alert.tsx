import { cn } from "@/libs/utils";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";

const alertVariants = cva(
  `p-4 text-black/80 text-sm border-2 rounded-sm w-full`,
  {
    variants: {
      variant: {
        success: "border-polar-green-300 bg-polar-green-100",
        warning: "border-gold-300 bg-gold-100",
      },
    },
    defaultVariants: {
      variant: "success",
    },
  }
);

interface AlertProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof alertVariants> {
  children: React.ReactNode;
}

const Alert = ({ children, className, variant, ...props }: AlertProps) => {
  return (
    <div {...props} className={cn(alertVariants({ className, variant }))}>
      {children}
    </div>
  );
};

export default Alert;
