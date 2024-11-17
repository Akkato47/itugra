import { EventCard, translateEvenType } from "@entities/event";
import { useGetAllRequestsQuery } from "@entities/event";

import { paths } from "@shared/constants/react-router";
import { Skeleton } from "@shared/ui";

const AdminRequestsPage = () => {
  const { data, isPending } = useGetAllRequestsQuery({});

  return (
    <section className='w-full'>
      {data && (
        <div className='space-y-6'>
          {data.data.filter((request) => !request.watched).length > 0 ? (
            data.data
              .filter((request) => !request.watched)
              .map((request) => (
                <EventCard
                  isNotHistory={true}
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
              <div className='rounded-xl text-white px-10 py-2 bg-gray-900'>
                <p>На данный момент нет активных заявок</p>
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
    </section>
  );
};

export default AdminRequestsPage;
