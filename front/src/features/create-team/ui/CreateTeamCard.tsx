import { PlusCircledIcon } from "@radix-ui/react-icons";

import { buttonVariants } from "@shared/constants/shade-cn";
import { Button } from "@shared/ui";
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@shared/ui/dialog";

import { CreateTeamForm } from "./Form";

export const CreateTeamCard = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button
        variant='ghost'
        className='border-2 border-dashed w-full max-w-[264px] h-[352px] border-slate-300 rounded-lg'
      >
        <PlusCircledIcon className='opacity-60 size-36' />
      </Button>
    </DialogTrigger>
    <DialogContent aria-describedby={undefined}>
      <DialogTitle className='text-left'>Создание команды</DialogTitle>
      <CreateTeamForm>
        <DialogClose className={buttonVariants({ variant: "outline" })}>Назад</DialogClose>
      </CreateTeamForm>
    </DialogContent>
  </Dialog>
);
