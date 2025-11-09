import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const glassCardVariants = cva(
  "backdrop-blur-md border transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-white/40 border-[var(--color-foreground)]",
        light: "bg-white/60 border-white/80",
        dark: "bg-black/40 border-black/60",
        muted: "bg-[var(--color-muted)]/30 border-[var(--color-border)]",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-lg",
        md: "rounded-xl",
        lg: "rounded-2xl",
        full: "rounded-full",
      },
      padding: {
        none: "p-0",
        sm: "p-3",
        md: "p-4 md:p-6",
        lg: "p-6 md:p-8",
      },
      blur: {
        sm: "backdrop-blur-sm",
        md: "backdrop-blur-md",
        lg: "backdrop-blur-lg",
        xl: "backdrop-blur-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      rounded: "lg",
      padding: "md",
      blur: "md",
    },
  }
);

export interface GlassCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassCardVariants> {
  asChild?: boolean;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant, rounded, padding, blur, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(glassCardVariants({ variant, rounded, padding, blur, className }))}
        {...props}
      >
        {children}
      </div>
    );
  }
);
GlassCard.displayName = "GlassCard";

export { GlassCard, glassCardVariants };