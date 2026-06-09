import { CreateTeamCard } from "@features/create-team";

import { InviteCard, TeamCard, useTeamInviteSocket } from "@entities/team";
import { useGetTeamListQuery, useTeamInvitesQuery } from "@entities/team";

import { Heading } from "@shared/ui";

const TeamsPage = () => {
  const { data } = useGetTeamListQuery({});
  const { data: invitesData } = useTeamInvitesQuery();

  useTeamInviteSocket();

  const invites = invitesData?.data ?? [];

  return (
    <section className='space-y-10'>
      {invites.length !== 0 && (
        <div className='space-y-6'>
          <Heading variant='h2'>Приглашения</Heading>
          <div className='flex flex-wrap gap-6'>
            {invites.map((invite) => (
              <InviteCard key={invite.inviteUid} invite={invite} />
            ))}
          </div>
        </div>
      )}

      <div className='space-y-6'>
        <Heading variant='h2'>Команды</Heading>
        <div className='flex flex-wrap gap-6'>
          {data &&
            data.data.length !== 0 &&
            data.data.map((team) => <TeamCard key={team.uid} name={team.name} uid={team.uid} />)}
          <CreateTeamCard />
        </div>
      </div>
    </section>
  );
};

export default TeamsPage;
