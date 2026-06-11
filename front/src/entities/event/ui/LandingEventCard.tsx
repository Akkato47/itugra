import { Link } from "react-router-dom";

import { paths } from "@shared/constants/react-router";
import { buttonVariants } from "@shared/constants/shade-cn";
import { CalendarClockIcon } from "@shared/icons";
import { CarouselItem, CustomImage, Heading } from "@shared/ui";

interface ILandingEventCardProps {
  uid: string;
  title: string;
  desc: string;
  date: string;
  latters: string;
  image: string;
}

export const LandingEventCard = ({
  uid,
  title,
  date,
  desc,
  image,
  latters
}: ILandingEventCardProps) => (
  <CarouselItem key={uid} className='flex items-center gap-10'>
    <div className='flex flex-col gap-5 flex-1 max-w-[60%]'>
      <Heading tag='h3' variant='h3' className='text-slate-50'>
        {title}
      </Heading>
      <p className='text-xl leading-[140%] text-slate-50'>{desc}</p>
      <p className='text-slate-50 text-xl leading-[140%] space-y-2'>
        <span className='flex gap-1 items-center'>
          <CalendarClockIcon />
          {date}
        </span>
        <span>{latters}</span>
      </p>
      <Link
        to={`${paths.PROFILE}/${paths.EVENT}/${uid}`}
        className={buttonVariants({ variant: "outline", className: "w-[229px]" })}
      >
        Записаться на мероприятие
      </Link>
    </div>
    <CustomImage src={image} alt='event-photo' className='w-[360px] h-[272px]' />
  </CarouselItem>
);
