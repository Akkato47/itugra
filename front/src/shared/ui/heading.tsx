import clsx from "clsx";

type THeadingTag = "h1" | "h2" | "h3" | "h4";
const headingVariants = {
  h1: "font-extrabold text-5xl leading-[100%]",
  h2: "font-semibold text-3xl leading-[120%]",
  h3: "font-semibold text-2xl leading-[133%]",
  h4: "font-semibold text-xl leading-[140%]"
  // h5: "text-lg leading-[160%]",
  // h6: "text-base font-normal leading-[150%]"
};

export type TypographyProps<Tag extends THeadingTag> = React.ComponentProps<Tag> & {
  tag?: THeadingTag;
  variant?: THeadingTag;
  children: React.ReactNode;
};

export const Heading = <Tag extends THeadingTag = "h1">({
  tag = "h1",
  children,
  className,
  variant = "h1",
  ...props
}: TypographyProps<Tag>) => {
  const Component = tag;

  return (
    <Component className={clsx(className, headingVariants[variant])} {...props}>
      {children}
    </Component>
  );
};
