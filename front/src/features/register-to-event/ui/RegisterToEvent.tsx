import { useState } from "react";

import { useGetMyRegistrationsQuery } from "@entities/event";
import { useGetTeamListQuery } from "@entities/team";

import { buttonVariants } from "@shared/constants/shade-cn";
import { Button } from "@shared/ui";
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@shared/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/ui/select";

import { useCancelRegistrationMutation } from "../api/useCancelRegistrationMutation";
import { useRegisterSoloMutation } from "../api/useRegisterSoloMutation";
import { useRegisterTeamMutation } from "../api/useRegisterTeamMutation";

interface IRegisterToEventProps {
  eventUid: string;
  disabled?: boolean;
}

export const RegisterToEvent = ({ eventUid, disabled }: IRegisterToEventProps) => {
  const [open, setOpen] = useState(false);
  const [teamUid, setTeamUid] = useState<string | undefined>();

  const { data: registrationsData } = useGetMyRegistrationsQuery({});
  const { data: teamsData } = useGetTeamListQuery({});

  const registerSolo = useRegisterSoloMutation();
  const registerTeam = useRegisterTeamMutation();
  const cancel = useCancelRegistrationMutation();

  const myRegistration = registrationsData?.data.find(
    (registration) => registration.eventUid === eventUid
  );

  if (myRegistration) {
    return (
      <Button
        variant='outline'
        disabled={cancel.isPending}
        onClick={() => cancel.mutate({ params: { registrationUid: myRegistration.registrationUid } })}
      >
        {cancel.isPending ? "Отменяем..." : "Отменить регистрацию"}
      </Button>
    );
  }

  const submitTeam = () => {
    if (!teamUid) return;

    registerTeam.mutate(
      { params: { eventUid, teamUid } },
      {
        onSuccess: () => {
          setOpen(false);
          setTeamUid(undefined);
        }
      }
    );
  };

  const teams = teamsData?.data ?? [];

  return (
    <div className='flex items-center gap-3'>
      <Button
        disabled={disabled || registerSolo.isPending}
        onClick={() => registerSolo.mutate({ params: { eventUid } })}
      >
        {registerSolo.isPending ? "Записываем..." : "Записаться"}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant='outline' disabled={disabled || teams.length === 0}>
            Командой
          </Button>
        </DialogTrigger>
        <DialogContent aria-describedby={undefined} className='space-y-4'>
          <DialogTitle>Регистрация командой</DialogTitle>
          <Select value={teamUid} onValueChange={setTeamUid}>
            <SelectTrigger>
              <SelectValue placeholder='Выберите команду' />
            </SelectTrigger>
            <SelectContent>
              {teams.map((team) => (
                <SelectItem key={team.uid} value={team.uid}>
                  {team.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className='flex items-center justify-end gap-2'>
            <DialogClose className={buttonVariants({ variant: "outline" })}>Отмена</DialogClose>
            <Button disabled={!teamUid || registerTeam.isPending} onClick={submitTeam}>
              {registerTeam.isPending ? "Регистрируем..." : "Зарегистрировать"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
