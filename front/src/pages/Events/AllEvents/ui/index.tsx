import { EventCard, translateEvenType, useGetAllEventsQuery } from "@entities/event";

import { paths } from "@shared/constants/react-router";
import { Skeleton } from "@shared/ui";

const AllEventsPage = () => {
  const { data, isPending } = useGetAllEventsQuery({});

  return (
    <section className='space-y-6'>
      <div className='w-full'>
        {data && (
          <div className='space-y-6'>
            {data.data.length > 0 ? (
              data.data.map((request) => (
                <EventCard
                  uid={request.uid}
                  org={translateEvenType(request.type)}
                  description={request.description}
                  name={request.name}
                  redirectUrl={paths.PROFILE + "/" + paths.EVENT}
                  key={request.uid}
                />
              ))
            ) : (
              <div className='flex items-center justify-center'>
                <div className='rounded-xl text-white px-10 py-2 bg-gray-900'>
                  <p>Нет доступных мероприятий</p>
                </div>
              </div>
            )}
          </div>
        )}
        {isPending && (
          <div className='space-y-6'>
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton className='w-full h-14' key={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllEventsPage;
