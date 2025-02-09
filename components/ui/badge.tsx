import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border-[0.5px] border-neutral-200 px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 dark:border-neutral-800 dark:focus:ring-neutral-300",
  {
    variants: {
      variant: {
        default: "border-neutral-100 bg-neutral-100 text-neutral-500 ",
        secondary: "text-blue-600  border-blue-200 bg-blue",
        destructive: "border-red-200 text-red-600 bg-red ",
        outline: "text-neutral-700 border-neural-300",
        warning: "text-yellow-700  border-yellow-200 bg-yellow",
        success: "text-green-600  border-green-300 bg-green",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
