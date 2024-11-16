import { ChevronDownIcon, GearIcon, Share1Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import type { IAuthResponse } from "@features/sign-in";
import { LogoutButton } from "@features/sign-out";

import { paths } from "@shared/constants/react-router";
import { SupportIcon } from "@shared/icons";
import { cn } from "@shared/lib/shade-cn";
import { Avatar } from "@shared/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@shared/ui/dropdown-menu";

interface IProfileWidgetProps {
  user: IAuthResponse;
}

export const ProfileWidget = ({ user }: IProfileWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  const closeDropDown = () => setIsOpen(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={(value) => setIsOpen(value)}>
      <DropdownMenuTrigger>
        <div className='flex items-center gap-2'>
          <Avatar
            src={user.image ? user.image.fileUrl : "/images/user.webp"}
            alt='your avatar'
            className='size-10 rounded-full'
            isEdit={false}
          />
          <ChevronDownIcon className={cn(isOpen && "rotate-180", "duration-300")} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-fit'>
        <DropdownMenuLabel className='flex items-center flex-col justify-center text-sm gap-1 my-1'>
          <p className='leading-[143%] text-slate-700 font-semibold'>
            {user.shortInfo.fullName.split(" ")[1]}
          </p>
          <p className='leading-[143%] text-slate-400 font-semibold'>{user.shortInfo.mail}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className='px-2 space-y-2'>
          <Link
            to={paths.SHARE}
            onClick={closeDropDown}
            className='flex items-center gap-2 py-1 px-2 rounded-md hover:bg-slate-100'
          >
            <Share1Icon className='size-5' />
            <p className='leading-[143%]'>Поделиться</p>
          </Link>
          <Link
            to={paths.PERSONAL_DATA_SETTINGS}
            state={{ prevPathName: pathname }}
            onClick={closeDropDown}
            className='flex items-center gap-2 py-1 px-2 rounded-md hover:bg-slate-100'
          >
            <GearIcon className='size-5' />
            <p className='leading-[143%]'>Настройки</p>
          </Link>
          <Link
            to={paths.SUPPORT}
            onClick={closeDropDown}
            className='flex items-center gap-2 py-1 px-2 rounded-md hover:bg-slate-100'
          >
            <SupportIcon className='size-5' />
            <p className='leading-[143%]'>Поддержка</p>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
