import { useState } from "react";

import type { IRoleInTeam } from "@entities/team";
import { useCreateInviteMutation } from "@entities/team";

import { buttonVariants } from "@shared/constants/shade-cn";
import { Button, Input } from "@shared/ui";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from "@shared/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@shared/ui/select";

interface IInviteToTeamProps {
  teamUid: string;
  roles: IRoleInTeam[];
}

export const InviteToTeam = ({ teamUid, roles }: IInviteToTeamProps) => {
  const [open, setOpen] = useState(false);
  const [userTag, setUserTag] = useState("");
  const [ctrUid, setCtrUid] = useState<string | undefined>();

  const createInvite = useCreateInviteMutation();

  const submit = () => {
    if (!userTag || !ctrUid) return;

    createInvite.mutate(
      { params: { userTag: userTag.replace(/^@/, ""), teamUid, ctrUid } },
      {
        onSuccess: () => {
          setOpen(false);
          setUserTag("");
          setCtrUid(undefined);
        }
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>Пригласить</Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined} className='space-y-4'>
        <DialogTitle>Пригласить в команду</DialogTitle>
        <Input
          placeholder='Тег пользователя, например @user'
          value={userTag}
          onChange={(e) => setUserTag(e.target.value)}
        />
        <Select value={ctrUid} onValueChange={setCtrUid}>
          <SelectTrigger>
            <SelectValue placeholder='Выберите роль' />
          </SelectTrigger>
          <SelectContent>
            {roles.map((role) => (
              <SelectItem key={role.uid} value={role.uid}>
                {role.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className='flex items-center justify-end gap-2'>
          <DialogClose className={buttonVariants({ variant: "outline" })}>Отмена</DialogClose>
          <Button disabled={!userTag || !ctrUid || createInvite.isPending} onClick={submit}>
            {createInvite.isPending ? "Отправляем..." : "Отправить"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
