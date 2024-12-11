import { createElement } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const textVariants = cva("text-primary-forground", {
  variants: {
    preset: {
      "4.5xl": "text-[2.625rem] font-bold",
      "2xl": "text-2xl font-semibold",
      base: "text-base",
      sm: "text-sm",

      h1: "text-2xl font-medium",
      h2: "text-2xl font-medium",
      h3: "text-base font-medium",
      p: "text-base",
      span: "text-base",
      link: "text-base underline",
      small: "text-sm",
      caption: "text-xs",
    },
  },
  defaultVariants: {
    preset: "p",
  },
});

interface TextProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof textVariants> {
  as?: string;
}

export function Text({ as = "p", className, preset, ...props }: TextProps) {
  return createElement(as, {
    className: cn(textVariants({ preset }), className),
    ...props,
  });
}
