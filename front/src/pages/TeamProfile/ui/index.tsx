import { CreateTeamCard } from "@features/create-team";

import { TeamCard } from "@entities/team";
import { useGetTeamListQuery } from "@entities/team";

import { Heading } from "@shared/ui";

const TeamsPage = () => {
  const { data } = useGetTeamListQuery({});

  return (
    <section className='space-y-6'>
      <Heading variant='h2'>Команды</Heading>
      <div className='flex flex-wrap gap-6'>
        {data &&
          data.data.length !== 0 &&
          data.data.map((team) => <TeamCard key={team.uid} name={team.name} uid={team.uid} />)}
        <CreateTeamCard />
      </div>
    </section>
  );
};

export default TeamsPage;
