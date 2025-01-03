import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center rounded-full border", {
  variants: {
    variant: {
      default:
        "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
      success: "border-transparent bg-lime-50 text-lime-900 px-4 py-1",
      danger:
        "border-transparent bg-brand-primary text-brand-subtle px-8 py-4 rounded-base",
      outline: "text-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
