import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { CircularLoader } from "./loader";

const buttonVariants = cva("relative inline-flex items-center justify-center", {
  variants: {
    variant: {
      filled:
        "py-3 px-6 bg-gray-900 rounded-[32px] text-white-500 hover:bg-gray-800 active:bg-gray-900 active:opacity-100 disabled:bg-gray-a10 disabled:text-white-300 disabled:opacity-20 disabled:pointer-events-none",
      outline:
        "py-3 px-6 bg-gray-900 rounded-[32px] text-white-500 border border-white-500 hover:opacity-30 active:bg-gray-900 active:opacity-100 disabled:bg-gray-900  disabled:opacity-20 disabled:pointer-events-none",
      brand:
        "py-3 px-6 bg-brand-500 rounded-[32px] text-white-500 hover:bg-brand-700 active:bg-brand-500 disabled:bg-brand-500-opacity disabled:pointer-events-none",
      text: "text-brand-500 rounded-[22px] py-[6px] px-2 hover:bg-brand-50 active:bg-transparent disabled:bg-transparent disabled:opacity-60 disabled:pointer-events-none",
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

        <span className="px-1">{children}</span>

        {!loading && iconRight && <span>{iconRight}</span>}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
