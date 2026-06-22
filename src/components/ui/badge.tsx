import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-white/10 text-white",
        secondary: "border-white/10 bg-white/5 text-white/70",
        outline: "border-white/20 text-white/70",
        success: "border-emerald-400/20 bg-emerald-400/10 text-emerald-400",
        warning: "border-amber-400/20 bg-amber-400/10 text-amber-400",
        destructive: "border-rose-400/20 bg-rose-400/10 text-rose-400",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
