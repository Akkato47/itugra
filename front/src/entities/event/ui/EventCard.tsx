import { Link } from "react-router-dom";

import { CustomImage, Heading } from "@shared/ui";

interface IEventCardProps {
  redirectUrl: string;
  name: string;
  description: string;
  org: string;
  uid: string;
  isNotHistory?: boolean;
}

export const EventCard = ({
  redirectUrl,
  name,
  description,
  org,
  uid,
  isNotHistory
}: IEventCardProps) => (
  <Link to={`${redirectUrl}/${uid}`} state={isNotHistory && { uid }} className='w-full'>
    <div className='flex gap-10 py-6 px-9 shadow-lg rounded-xl'>
      <CustomImage src='/images/createTeamImage.webp' alt='event_image' className='h-full w-48' />
      <div className='space-y-2'>
        <Heading variant='h3' className='text-[#0066B3]'>
          {name}
        </Heading>
        <p className='leading-[171%] text-sm'>{description}</p>
        <p className='leading-[171%] text-sm opacity-60 mt-5'>{org}</p>
      </div>
    </div>
  </Link>
);
