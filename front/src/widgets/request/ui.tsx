import { Pencil1Icon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

import { categoryData } from "@features/create-event-request/constants/categoryData.constant";

import { buttonVariants } from "@shared/constants/shade-cn";
import { cn } from "@shared/lib/shade-cn";
import { CustomImage, Heading } from "@shared/ui";

interface IRequestWidgetProps {
  name: string;
  org: string;
  type: string;
  description: string;
  categoryId: number[];
}

export const RequestWidget = ({
  org,
  name,
  type,
  description,
  categoryId
}: IRequestWidgetProps) => (
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
            {name}
          </Heading>
          <div className='grid grid-cols-[150px_1fr]'>
            <div className='space-y-2'>
              <p>Тип мероприятия:</p>
              <p>Организатор:</p>
            </div>
            <div className='space-y-2'>
              <p>{type}</p>
              <p>{org}</p>
            </div>
          </div>
        </div>
        <CustomImage className='rounded-xl shadow-md' src='/images/createTeamImage.webp' />
      </div>
      <div className='space-y-2'>
        <Heading variant='h4'>Тэги</Heading>
        <div className='flex items-center flex-wrap gap-2'>
          {categoryId.map((id) => {
            const entry = Object.entries(categoryData).find((value) => value[1] === id);

            return entry ? (
              <p className='py-1 px-4 text-sm text-white bg-gray-600 rounded-md' key={id}>
                {entry[0]}
              </p>
            ) : null;
          })}
        </div>
      </div>
      <div className='space-y-4'>
        <Heading variant='h4'>Описание мероприятия</Heading>
        <p className='leading-[150%]'>{description}</p>
      </div>
    </div>
  </section>
);
