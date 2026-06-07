import { Link } from "react-router-dom";

import { GosUslugiIcon, TelegramIcon, VkIcon, YandexIcon } from "@shared/icons";
import { generateUUIDv4 } from "@shared/lib/generateUUIDv4";
import { Heading } from "@shared/ui";

export const OauthGrid = () => (
  <div className='flex items-center justify-center flex-col gap-6'>
    <Heading variant='h4' tag='h4'>
      Через социальные сети
    </Heading>
    <div className='grid grid-cols-2 grid-rows-3 grid-flow-row gap-6 w-[360px]'>
      <button
        disabled
        title='Скоро'
        className='flex items-center justify-center bg-slate-200 col-span-2 rounded-lg opacity-50 grayscale cursor-not-allowed'
      >
        <VkIcon />
      </button>
      <Link
        className='flex items-center justify-center text-center bg-[#FB3F1D] rounded-lg'
        to={`${import.meta.env.BASE_YANDEX_API_URL}/authorize?response_type=code&client_id=${import.meta.env.YANDEX_CLIENT_ID}&redirect_uri=${import.meta.env.YANDEX_REDIRECT_URI}&device_id=${generateUUIDv4()}`}
      >
        <YandexIcon />
      </Link>
      <button
        disabled
        title='Скоро'
        className='flex items-center justify-center bg-slate-200 rounded-lg opacity-50 grayscale cursor-not-allowed'
      >
        <GosUslugiIcon />
      </button>
      <button
        disabled
        title='Скоро'
        className='flex items-center justify-center bg-slate-200 col-span-2 rounded-lg opacity-50 grayscale cursor-not-allowed'
      >
        <div className='py-9'>
          <TelegramIcon />
        </div>
      </button>
    </div>
  </div>
);
