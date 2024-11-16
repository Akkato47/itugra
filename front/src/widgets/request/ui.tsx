import { Pencil1Icon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

import { buttonVariants } from "@shared/constants/shade-cn";
import { cn } from "@shared/lib/shade-cn";
import { CustomImage, Heading } from "@shared/ui";

export const RequestWidget = () => (
  <section className='border border-slate-300 rounded-xl'>
    <div className='py-6 px-10 space-y-4 relative'>
      <Link
        to={"#"}
        className={cn(buttonVariants({ size: "icon", variant: "ghost" }), "absolute right-8")}
      >
        <Pencil1Icon className='size-6' />
      </Link>
      <div className='grid grid-cols-2'>
        <div className='space-y-6'>
          <Heading variant='h2' className='text-[#0066B3]'>
            Лидеры региона – 2023
          </Heading>
          <div className='grid grid-cols-[200px_200px]'>
            <div className='space-y-2'>
              <p>Тип мероприятия:</p>
              <p>Тэги:</p>
              <p>Организатор:</p>
            </div>
            <div className='space-y-2'>
              <p>Хакатон</p>
              <div className='flex items-center gap-1'>
                {Array.from({ length: 2 }).map((_, index) => (
                  <p className='py-1 px-4 text-sm text-white bg-gray-600 rounded-md' key={index}>
                    frfr
                  </p>
                ))}
              </div>
              <p>{"ОАО 'Сургутнефтегаз'"}</p>
            </div>
          </div>
        </div>
        <CustomImage className='rounded-xl shadow-md' src='/images/createTeamImage.webp' />
      </div>
      <div className='space-y-4'>
        <Heading variant='h3'>Описание мероприятия</Heading>
        <p className='leading-[150%]'>
          Конкурсный отбор участников специального проекта поощрения активной молодежи в
          Ханты-Мансийском автономном округе – Югре «Лидеры региона – 2023» программы
          гражданско-патриотического и общественно полезного молодежного туризма «Больше, чем
          путешествие»
        </p>
      </div>
    </div>
  </section>
);
