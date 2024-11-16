import { useEffect, useState } from "react";

import { LandingEventCard } from "@entities/event";

import type { CarouselApi } from "@shared/ui";
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious, Heading } from "@shared/ui";

const data = [
  {
    title: "Название мероприятия1",
    desc: "Описание мероприятия описание мероприятия описание мероприятия",
    date: "16 января 2024 - 20 января 2024",
    latters: "✓ Заявки открыты",
    image: "/images/iPhoneTest.png"
  },
  {
    title: "Название мероприятия2",
    desc: "Описание мероприятия описание мероприятия описание мероприятия",
    date: "16 января 2024 - 20 января 2024",
    latters: "✓ Заявки открыты",
    image: "/images/iPhoneTest.png"
  },
  {
    title: "Название мероприятия3",
    desc: "Описание мероприятия описание мероприятия описание мероприятия",
    date: "16 января 2024 - 20 января 2024",
    latters: "✓ Заявки открыты",
    image: "/images/iPhoneTest.png"
  }
];

export const LandingCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section className='bg-gray-900 rounded-[80px] relative'>
      <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[100px] rounded-full blur-[100px] bg-[#FF4949]' />
      <div className='px-[72px] py-7 flex items-center justify-center flex-col'>
        <Heading tag='h2' variant='h2' className='text-slate-50'>
          Ближайшие мероприятия
        </Heading>
        <div className=''>
          <Carousel setApi={setApi} className='mt-10'>
            <CarouselContent>
              {data.map((item) => (
                <LandingEventCard key={item.title} {...item} />
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className='flex justify-center items-center gap-5 mt-20'>
            {data.map((_, index) => (
              <div
                key={_.title}
                className={`w-20 h-2 rounded-full ${
                  index === current - 1 ? "bg-slate-600" : "bg-white"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
