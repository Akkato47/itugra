import { useState } from "react";

import { ERegistrationKind, useGetParticipantsQuery } from "@entities/event";

import { Button } from "@shared/ui";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@shared/ui/dialog";

export const ParticipantsDialog = ({ eventUid }: { eventUid: string }) => {
  const [open, setOpen] = useState(false);
  const { data } = useGetParticipantsQuery({ eventUid, options: { enabled: open } });

  const participants = data?.data ?? [];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>Участники</Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined} className='max-h-[70vh] space-y-3 overflow-y-auto'>
        <DialogTitle>Участники ({participants.length})</DialogTitle>
        {participants.length > 0 ? (
          <div className='space-y-2'>
            {participants.map((participant) => (
              <div
                key={participant.registrationUid}
                className='flex items-center justify-between rounded-lg border border-border px-3 py-2'
              >
                <span className='text-sm'>
                  {participant.kind === ERegistrationKind.TEAM
                    ? participant.teamName
                    : participant.userName}
                </span>
                <span className='text-xs opacity-60'>
                  {participant.kind === ERegistrationKind.TEAM
                    ? "Команда"
                    : `@${participant.userTag ?? ""}`}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className='text-sm opacity-60'>Никто не зарегистрирован</p>
        )}
      </DialogContent>
    </Dialog>
  );
};
