import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as React from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";

import { cn } from "@shared/lib/shade-cn";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(
  (
    { className, ...props }: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>,
    ref
  ) => <AccordionPrimitive.Item ref={ref} className={className} {...props} />
);
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(
  (
    {
      className,
      children,
      ...props
    }: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>,
    ref
  ) => (
    <AccordionPrimitive.Header className='flex'>
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex flex-1 rounded-lg border p-6 border-slate-300 items-center justify-between py-4 text-sm font-medium transition-all [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className='h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 dark:text-slate-400' />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(
  (
    {
      className,
      children,
      ...props
    }: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>,
    ref
  ) => (
    <AccordionPrimitive.Content
      ref={ref}
      className='overflow-hidden mt-5 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'
      {...props}
    >
      <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
);
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
