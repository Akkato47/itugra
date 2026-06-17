import { Link } from "react-router-dom";

import type { IFriend } from "@entities/friend/types";

import { paths } from "@shared/constants/react-router";
import { Avatar, Heading } from "@shared/ui";

interface IFriendCardProps {
  friend: IFriend;
  children?: React.ReactNode;
}

export const FriendCard = ({ friend, children }: IFriendCardProps) => {
  const name = friend.fullName.split(" ");

  return (
    <div className='border w-full max-w-[264px] flex flex-col items-center gap-4 p-4 border-border rounded-lg'>
      <Link to={`${paths.PROFILE}/${friend.tag}`}>
        <Avatar
          isEdit={false}
          size='profile'
          src={friend.image ? friend.image.fileUrl : "/images/user.webp"}
          alt={`${friend.fullName} avatar`}
        />
      </Link>
      <Link to={`${paths.PROFILE}/${friend.tag}`} className='text-center'>
        <Heading tag='h3' variant='h4'>
          {name[1] ? `${name[1]} ${name[0]}` : friend.fullName}
        </Heading>
        <p className='text-blue-500 leading-[150%]'>{`@${friend.tag}`}</p>
      </Link>
      {children}
    </div>
  );
};
