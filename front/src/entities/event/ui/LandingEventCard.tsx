import { CalendarClockIcon } from "@shared/icons";
import { Button, CarouselItem, CustomImage, Heading } from "@shared/ui";

interface ILandingEventCardProps {
  title: string;
  desc: string;
  date: string;
  latters: string;
  image: string;
}

export const LandingEventCard = ({ title, date, desc, image, latters }: ILandingEventCardProps) => (
  <CarouselItem key={title} className='flex items-center gap-10'>
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
      <Button className='w-[229px]' variant={"outline"}>
        Записаться на мероприятие
      </Button>
    </div>
    <CustomImage src={image} alt='event-photo' className='w-[360px] h-[272px]' />
  </CarouselItem>
);
