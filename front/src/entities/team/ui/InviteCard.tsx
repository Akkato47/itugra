import { useAcceptInviteMutation } from "../api/hooks/useAcceptInviteMutation";
import { useDeclineInviteMutation } from "../api/hooks/useDeclineInviteMutation";
import type { ITeamInvite } from "../types";

import { Avatar, Button, Heading } from "@shared/ui";

interface IInviteCardProps {
  invite: ITeamInvite;
}

export const InviteCard = ({ invite }: IInviteCardProps) => {
  const accept = useAcceptInviteMutation();
  const decline = useDeclineInviteMutation();

  const isPending = accept.isPending || decline.isPending;

  return (
    <div className='border w-full max-w-[264px] flex flex-col items-center gap-4 p-4 border-slate-300 rounded-lg'>
      <Avatar
        isEdit={false}
        size='profile'
        src={invite.teamImage ? invite.teamImage.fileUrl : "/images/user.webp"}
        alt='team avatar'
      />
      <div className='text-center space-y-1'>
        <Heading tag='h3' variant='h4'>
          {invite.teamName}
        </Heading>
        <p className='leading-[150%] flex items-center justify-center gap-2'>
          <span
            className='inline-block size-3 rounded-full shrink-0'
            style={{ backgroundColor: invite.roleColor }}
          />
          {invite.roleName}
        </p>
        <p className='text-sm opacity-60 leading-[150%]'>Пригласил: {invite.inviterName}</p>
      </div>
      <div className='flex items-center gap-2 w-full'>
        <Button
          className='w-full'
          disabled={isPending}
          onClick={() => accept.mutate({ params: { inviteUid: invite.inviteUid } })}
        >
          Принять
        </Button>
        <Button
          className='w-full'
          variant='outline'
          disabled={isPending}
          onClick={() => decline.mutate({ params: { inviteUid: invite.inviteUid } })}
        >
          Отклонить
        </Button>
      </div>
    </div>
  );
};
