import { cn } from "@shared/lib/shade-cn";

const Skeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("animate-pulse rounded-md bg-slate-900/10 dark:bg-slate-50/10", className)}
    {...props}
  />
);

export { Skeleton };
