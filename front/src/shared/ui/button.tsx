import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import type { VariantProps } from "class-variance-authority";

import { buttonVariants } from "@shared/constants/shade-cn";
import { LoadingIcon } from "@shared/icons";
import { cn } from "@shared/lib/shade-cn";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      loading = "default",
      size,
      asChild = false,
      ...props
    }: ButtonProps,
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    if (loading === "loading") {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          disabled
          {...props}
        >
          <LoadingIcon size={18} />
          Загрузка...
        </Comp>
      );
    } else {
      return (
        <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
      );
    }
  }
);
Button.displayName = "Button";

export { Button };
