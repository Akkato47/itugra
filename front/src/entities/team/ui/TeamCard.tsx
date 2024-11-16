import { ArrowRightIcon, ExitIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

import { paths } from "@shared/constants/react-router";
import { buttonVariants } from "@shared/constants/shade-cn";
import { cn } from "@shared/lib/shade-cn";
import { Avatar, Button, Heading } from "@shared/ui";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from "@shared/ui/dialog";

interface ITeamCardProps {
  uid: string;
  name: string;
  image?: IImage;
}

export const TeamCard = ({ image, name, uid }: ITeamCardProps) => (
  <div className='border w-full max-w-[264px] flex items-center justify-center relative h-[352px] border-slate-300 rounded-lg'>
    <div className='pt-4'>
      <Dialog>
        <DialogTrigger asChild>
          <Button className='absolute top-3 right-4' variant='ghost' size='icon'>
            <ExitIcon className='size-6' />
          </Button>
        </DialogTrigger>
        <DialogContent aria-describedby={undefined}>
          <DialogTitle className='text-left text-lg'>
            Вы уверены что хотите выйти из команды {name}?
          </DialogTitle>
          <DialogDescription>
            Это действие невозможно отменить. Вам придется заново присоединяться к команде
          </DialogDescription>
          <div className='flex items-center justify-end gap-2'>
            <DialogClose className={buttonVariants({ variant: "outline" })}>Назад</DialogClose>
            <Button>Выйти</Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className='flex flex-col gap-4 items-center'>
        <Avatar
          isEdit={false}
          size='profile'
          src={image ? image.fileUrl : "/images/user.webp"}
          alt='team avatar'
        />
        <Heading tag='h3' variant='h3'>
          {name}
        </Heading>
        <Link
          to={`${paths.TEAMS}/${uid}`}
          className={cn(buttonVariants({ variant: "default" }), "space-x-2")}
        >
          <span className='font-medium leading-[171%]'>Перейти</span>
          <ArrowRightIcon />
        </Link>
      </div>
    </div>
  </div>
);
