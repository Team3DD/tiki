import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:transition-all [&_svg]:duration-300 group cursor-pointer rounded-full hover:scale-105",
  {
    variants: {
      variant: {
        default:
          "relative overflow-hidden hover:shadow-lg before:absolute before:inset-0 before:z-0 before:transition-transform before:duration-300 before:translate-x-[-101%] hover:before:translate-x-0 bg-[var(--color-foreground)] text-[var(--color-background)] before:bg-[var(--color-background)] hover:text-[var(--color-foreground)] [&>span]:relative [&>span]:z-10 [&_svg]:relative [&_svg]:z-10 [&_svg:last-child]:group-hover:translate-x-1",
        destructive:
          "bg-[var(--color-destructive)] text-[var(--color-destructive-foreground)] shadow-sm hover:bg-[var(--color-destructive)]/90 rounded-md",
        outline:
          "border border-[var(--color-input)] shadow-sm transition-colors duration-300 bg-transparent hover:bg-[var(--color-foreground)] hover:text-[var(--color-background)] hover:border-[var(--color-foreground)] [&_svg:first-child]:group-hover:scale-110 [&_svg:last-child]:group-hover:translate-x-1",
        secondary:
          "bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)] shadow-sm hover:bg-[var(--color-secondary)]/80 rounded-md [&_svg]:group-hover:scale-110",
        ghost:
          "hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-foreground)] rounded-md [&_svg]:group-hover:scale-110",
        link: "text-[var(--color-primary)] underline-offset-4 hover:underline rounded-none hover:scale-100",
      },
      size: {
        default: "h-9 px-6 py-2 text-sm",
        sm: "h-8 px-4 text-xs",
        lg: "h-11 px-8 py-4 text-lg",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    const content = variant === "default" || variant === undefined ? (
      <>
        <span>{children}</span>
        <ChevronRight className="h-5 w-5" />
      </>
    ) : children;
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {content}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };