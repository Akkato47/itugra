/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ChevronDownIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { type ReactNode, useState } from "react";
import { Link } from "react-router-dom";

import { useUser } from "@entities/user";

import { paths } from "@shared/constants/react-router";
import { buttonVariants } from "@shared/constants/shade-cn";
import { cn } from "@shared/lib/shade-cn";
import { Button, CustomImage, Heading, Input, Label } from "@shared/ui";
import { Avatar } from "@shared/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@shared/ui/dropdown-menu";

interface IMainProfileInfoProps extends React.ComponentProps<"section"> {
  userName: string[] | undefined;
  image: IImage | null;
  backgroundImage: IImage | null;
  children: ReactNode;
  tag?: string;
  isEdit: boolean;
  changeImage?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const MainProfileInfo = ({
  userName,
  tag,
  isEdit,
  image,
  children,
  backgroundImage,
  changeImage,
  ...props
}: IMainProfileInfoProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();

  const isYourProfile = tag === user?.tag;

  return (
    <section {...props} className='w-full max-w-[840px]'>
      <div className='flex flex-col items-center rounded-lg border border-slate-300'>
        {backgroundImage ? (
          <CustomImage
            src={backgroundImage?.fileUrl}
            className='w-full h-[234px] rounded-t-lg relative'
          />
        ) : (
          <div className='w-full h-[234px] bg-slate-400 rounded-t-lg'>
            {isEdit && (
              <div className='relative'>
                <Input id='fileInput' className='hidden' type='file' />
                <Label
                  className='bg-slate-900 flex items-center rounded-lg opacity-50 px-4 py-2 text-white absolute right-6 top-6 gap-2'
                  htmlFor='fileInput'
                >
                  <Pencil2Icon className='size-6' />
                  <span className='leading-[171%] text-sm font-medium'>Изменить обложку</span>
                </Label>
              </div>
            )}
          </div>
        )}
        <div className='w-full max-w-[650px] space-y-2 relative mt-2 mb-8'>
          <Avatar
            isEdit={isEdit}
            size='profile'
            changeImage={changeImage}
            src={image ? image.fileUrl : "/images/user.webp"}
            alt='your avatar'
            className='absolute -top-[100px] -left-4'
          />
          <div className='flex items-center'>
            <div className='w-[160px]' />
            <div className='flex flex-col'>
              <div className='grid grid-cols-2 gap-4'>
                {isEdit ? (
                  <Heading
                    variant='h3'
                    tag='h3'
                  >{`${userName![0]} ${userName![1]} ${userName![2]}`}</Heading>
                ) : (
                  <Heading variant='h3' tag='h3'>{`${userName![1]} ${userName![0]}`}</Heading>
                )}
                {!isEdit && (
                  <div className='flex items-center gap-4'>
                    {isYourProfile ? (
                      <Link
                        to={paths.PERSONAL_DATA_SETTINGS}
                        className={buttonVariants({ variant: "outline" })}
                      >
                        Редактировать
                      </Link>
                    ) : (
                      <Button variant='outline'>Добавить в друзья</Button>
                    )}
                    <DropdownMenu onOpenChange={(value) => setIsOpen(value)}>
                      <DropdownMenuTrigger asChild>
                        <Button variant='outline' className='space-x-2'>
                          <p>Ещё</p>
                          <ChevronDownIcon className={cn(isOpen && "rotate-180", "duration-300")} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className='w-56'>
                        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>
              {!isEdit && (
                <Link
                  to={`${paths.PROFILE}/${tag}`}
                  className='opacity-90 leading-[175%] text-blue-500 w-fit'
                >
                  {`@${tag}` || "f"}
                </Link>
              )}
            </div>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
};
