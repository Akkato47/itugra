import {
  EModerationStatus,
  moderationStatusColor,
  translateEvenType,
  translateModerationStatus,
  useGetMyRequestsQuery
} from "@entities/event";

import { cn } from "@shared/lib/shade-cn";
import { Heading, Skeleton } from "@shared/ui";

const CreatedEventsPage = () => {
  const { data, isPending } = useGetMyRequestsQuery({});

  return (
    <section className='space-y-6'>
      <div className='w-full'>
        {data && (
          <div className='space-y-6'>
            {data.data.length > 0 ? (
              data.data.map((request) => (
                <div
                  key={request.uid}
                  className='flex items-start justify-between gap-10 py-6 px-9 shadow-lg rounded-xl'
                >
                  <div className='space-y-2'>
                    <Heading variant='h3' className='text-brand'>
                      {request.name}
                    </Heading>
                    <p className='leading-[171%] text-sm opacity-60'>
                      {translateEvenType(request.type)}
                    </p>
                    {request.moderationStatus === EModerationStatus.REJECTED &&
                      request.moderationReason && (
                        <p className='leading-[171%] text-sm text-red-600'>
                          Причина: {request.moderationReason}
                        </p>
                      )}
                  </div>
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-4 py-1 text-sm text-white",
                      moderationStatusColor(request.moderationStatus)
                    )}
                  >
                    {translateModerationStatus(request.moderationStatus)}
                  </span>
                </div>
              ))
            ) : (
              <div className='flex items-center justify-center'>
                <div className='rounded-xl text-white px-10 py-2 bg-gray-900'>
                  <p>Вы ещё не создавали мероприятий</p>
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

export default CreatedEventsPage;
