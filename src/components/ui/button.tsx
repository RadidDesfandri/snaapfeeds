import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "gost";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = "default",
    size = "default",
    asChild = false,
    className,
    ...props
  }) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-red-ring-red-600 inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md text-xs font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-default disabled:opacity-50 aria-invalid:ring-red-600/20 md:text-sm dark:aria-invalid:ring-red-600/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
          variant === "default"
            ? "bg-black text-white shadow-xs hover:bg-black/90"
            : variant === "destructive"
              ? "focus-visible:ring-red-bg-red-600/20 dark:focus-visible:ring-red-bg-red-600/40 dark:bg-red-600/ bg-red-600 text-white shadow-xs hover:bg-red-600/90"
              : variant === "outline"
                ? "border shadow-xs"
                : variant === "secondary"
                  ? "bg-white text-black hover:bg-white/90"
                  : "",
          size === "default"
            ? "h-9 px-5 py-2 has-[>svg]:px-3"
            : size === "sm"
              ? "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5"
              : size === "lg"
                ? "h-10 rounded-md px-6 has-[>svg]:px-4"
                : "size-9",
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export default Button;
