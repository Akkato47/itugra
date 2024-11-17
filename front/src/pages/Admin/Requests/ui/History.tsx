import { EventCard, translateEvenType, useGetAllRequestsQuery } from "@entities/event";

import { paths } from "@shared/constants/react-router";
import { Skeleton } from "@shared/ui";

const AdminRequestsHistoryPage = () => {
  const { data, isPending } = useGetAllRequestsQuery({});

  return (
    <section className='space-y-6'>
      <div className='w-full'>
        {data && (
          <div className='space-y-6'>
            {data.data.filter((request) => request.watched).length > 0 ? (
              data.data
                .filter((request) => request.watched)
                .map((request) => (
                  <EventCard
                    uid={request.uid}
                    org={translateEvenType(request.type)}
                    description={request.description}
                    name={request.name}
                    redirectUrl={paths.ADMIN}
                    key={request.uid}
                  />
                ))
            ) : (
              <div className='flex items-center justify-center'>
                <div className='rounded-xl text-white px-10 py-2 bg-gray-900 text-center'>
                  <p>История заявок пуста</p>
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

export default AdminRequestsHistoryPage;
