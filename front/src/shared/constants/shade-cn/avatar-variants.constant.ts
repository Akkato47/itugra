import { cva } from "class-variance-authority";

export const avatarVariants = cva("rounded-full ", {
  variants: {
    size: {
      profile: "size-44",
      small: "size-10"
    }
  }
});
