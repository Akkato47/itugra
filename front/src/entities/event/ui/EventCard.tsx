import { Link } from "react-router-dom";

import { CustomImage, Heading } from "@shared/ui";

export const EventCard = () => (
  <Link to='ffsgfs' className='w-full'>
    <div className='flex gap-10 py-6 px-9 shadow-lg rounded-xl'>
      <CustomImage src='/images/user.webp' alt='event_image' className='h-full w-48' />
      <div className=''>
        <Heading variant='h3' className='text-[#0066B3]'>
          Лидеры региона – 2023
        </Heading>
        <p className='leading-[171%] text-sm'>
          Конкурсный отбор участников специального проекта поощрения активной молодежи в
          Ханты-Мансийском автономном округе – Югре «Лидеры региона – 2023» программы
          гражданско-патриотического и общественно полезного молодежного туризма «Больше, чем
          путешествие»
        </p>
        <p className='leading-[171%] text-sm opacity-60 mt-5'>
          Организатор: Фонд Центр гражданских и социальных инициатив Югры
        </p>
      </div>
    </div>
  </Link>
);
