import * as React from "react";

import { cn } from "@shared/lib/shade-cn";

export type InputProps<Component extends React.ElementType = "input"> = {
  component?: Component;
  className?: string;
} & React.ComponentPropsWithoutRef<Component> &
  React.RefAttributes<HTMLInputElement>;

const InputBase = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, component: Component = "input", ...props }: InputProps,
    ref: React.Ref<HTMLInputElement>
  ) => (
    <Component
      className={cn(
        "flex h-[45px] text-black w-[300px] rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);

InputBase.displayName = "Input";

export const Input = InputBase as <Component extends React.ElementType = "input">(
  props: InputProps<Component>
) => React.ReactElement;
