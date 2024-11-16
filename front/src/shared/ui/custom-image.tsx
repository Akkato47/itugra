type TImagesProps = React.ComponentProps<"img">;

const CustomImage = ({ src, alt, ...props }: TImagesProps) => (
  <img src={src} alt={alt} loading='lazy' {...props} />
);

CustomImage.displayName = "CustomImage";

export { CustomImage };
