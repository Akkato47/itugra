import { useEffect, useState } from "react";

import { LandingEventCard, translateEventStatus, useGetUpcomingEventsQuery } from "@entities/event";

import type { CarouselApi } from "@shared/ui";
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious, Heading } from "@shared/ui";

export const LandingCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const { data } = useGetUpcomingEventsQuery({});
  const events = data?.data ?? [];

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
        {events.length > 0 ? (
          <div className=''>
            <Carousel setApi={setApi} className='mt-10'>
              <CarouselContent>
                {events.map((event) => (
                  <LandingEventCard
                    key={event.uid}
                    uid={event.uid}
                    title={event.name}
                    desc={event.description ?? ""}
                    date={`${event.registrationEnd} — ${event.end}`}
                    latters={translateEventStatus(event.status)}
                    image={event.image?.fileUrl ?? "/images/iPhoneTest.png"}
                  />
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            <div className='flex justify-center items-center gap-5 mt-20'>
              {events.map((event, index) => (
                <div
                  key={event.uid}
                  className={`w-20 h-2 rounded-full ${
                    index === current - 1 ? "bg-slate-600" : "bg-white"
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          <p className='mt-10 text-xl text-slate-300'>Скоро здесь появятся мероприятия</p>
        )}
      </div>
    </section>
  );
};
