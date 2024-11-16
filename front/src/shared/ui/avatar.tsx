import { Pencil2Icon } from "@radix-ui/react-icons";
import type { VariantProps } from "class-variance-authority";
import { useState } from "react";

import { avatarVariants } from "@shared/constants/shade-cn";
import { cn } from "@shared/lib/shade-cn";

interface IAvatarProps extends React.ComponentProps<"img">, VariantProps<typeof avatarVariants> {
  isEdit: boolean;
  changeImage?: (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "backGroundImage") => void;
}

const Avatar = ({ src, isEdit, size, className, changeImage, ...props }: IAvatarProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const showEdit = () => setIsVisible((prev) => !prev);

  const submitHendler = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "image" | "backGroundImage"
  ) => {
    if (changeImage) changeImage(e, type);
  };

  return (
    <>
      {isEdit && (
        <div
          className={cn("relative h-fit rounded-full", className)}
          onMouseEnter={showEdit}
          onMouseLeave={showEdit}
        >
          <img
            src={src}
            className={cn(avatarVariants({ size }), "opacity-100", isVisible && "opacity-80")}
            alt='avatar'
          />
          {isVisible && (
            <form className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
              <label htmlFor='changePhoto' className='cursor-pointer'>
                <input
                  type='file'
                  onChange={(e) => submitHendler(e, "image")}
                  className='hidden'
                  id='changePhoto'
                  accept='image/*'
                />
                <Pencil2Icon className='size-10' />
              </label>
            </form>
          )}
        </div>
      )}
      {!isEdit && (
        <img
          src={src}
          className={cn(avatarVariants({ size, className }))}
          alt='avatar'
          {...props}
        />
      )}
    </>
  );
};

Avatar.displayName = "Avatar";

export { Avatar };
