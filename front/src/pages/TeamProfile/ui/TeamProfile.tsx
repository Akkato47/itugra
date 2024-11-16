/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { GearIcon } from "@radix-ui/react-icons";
import { Link, useParams } from "react-router-dom";

import { useGetTeamQuery } from "@entities/team";

import { buttonVariants } from "@shared/constants/shade-cn";
import { Avatar, Heading } from "@shared/ui";
import { Table, TableRow } from "@shared/ui/table";

const TeamProfilePage = () => {
  const { teamUid } = useParams();
  const { data } = useGetTeamQuery({ teamUid: teamUid! });

  return (
    <div className='space-y-8'>
      {data && (
        <>
          <section className='flex gap-6'>
            <Avatar
              isEdit={false}
              size='profile'
              src={data.data.image ? data.data.image.fileUrl : "/images/user.webp"}
              alt='team avatar'
            />
            <div className='space-y-3'>
              <div className='flex items-center gap-4'>
                <Heading variant='h2'>{data.data.name}</Heading>
                <Link to='settings' className={buttonVariants({ variant: "ghost", size: "icon" })}>
                  <GearIcon className='size-9' />
                </Link>
              </div>
              <p className='leading-[175%]'>{data.data.about || ""}</p>
            </div>
          </section>
          <section>
            <Table heading={`Состав команды ${data.data.name}`}>
              {data.data.userList.map((user) => (
                <TableRow
                  key={user.uid}
                  role={user.role}
                  username={user.fullName}
                  uid={user.uid}
                  circleColor={user.color}
                />
              ))}
            </Table>
          </section>
        </>
      )}
    </div>
  );
};

export default TeamProfilePage;
