import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { CircularLoader } from "./loader";

const buttonVariants = cva("relative inline-flex items-center justify-center", {
  variants: {
    variant: {
      filled:
        "py-3 px-6 bg-gray-900 rounded-[32px] text-white hover:bg-gray-900 hover:opacity-50 active:bg-gray-900 active:opacity-100 disabled:bg-gray-900  disabled:opacity-20 disabled:pointer-events-none",
      outline:
        "py-3 px-6 bg-gray-900 rounded-[32px] text-white border border-white hover:opacity-50 active:bg-gray-900 active:opacity-100 disabled:bg-gray-900  disabled:opacity-20 disabled:pointer-events-none",
      brand:
        "py-3 px-6 bg-brand-500 rounded-[32px] text-white hover:bg-brand-700 active:bg-brand-500 disabled:bg-brand-500 disabled:opacity-20 disabled:pointer-events-none",
      text: "text-brand-500 py-0 px-0",
    },
  },
  defaultVariants: {
    variant: "filled",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  loaderPosition?: "left" | "right";
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      loaderPosition = "left",
      children,
      loading = false,
      asChild = false,
      iconLeft,
      iconRight,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, className }))}
        ref={ref}
        {...props}
      >
        {loading && <CircularLoader />}

        {!loading && iconLeft && <span>{iconLeft}</span>}

        {children}

        {!loading && iconRight && <span>{iconRight}</span>}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
