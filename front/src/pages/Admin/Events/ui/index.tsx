import { translateEvenType, useGetAllEventsQuery } from "@entities/event";

import { Button, Heading, Skeleton } from "@shared/ui";

import { useCloseEventMutation, useDeleteEventMutation } from "../api/useEventActionMutations";
import { ParticipantsDialog } from "./ParticipantsDialog";

const AdminEventsPage = () => {
  const { data, isPending } = useGetAllEventsQuery({});
  const close = useCloseEventMutation();
  const remove = useDeleteEventMutation();

  return (
    <section className='space-y-6'>
      {data && (
        <div className='space-y-4'>
          {data.data.length > 0 ? (
            data.data.map((event) => (
              <div
                key={event.uid}
                className='flex items-center justify-between gap-6 rounded-xl px-9 py-5 shadow-lg'
              >
                <div className='space-y-1'>
                  <Heading variant='h3' className='text-brand'>
                    {event.name}
                  </Heading>
                  <p className='text-sm opacity-60'>
                    {translateEvenType(event.type)} · {event.status}
                  </p>
                </div>
                <div className='flex shrink-0 items-center gap-2'>
                  <ParticipantsDialog eventUid={event.uid} />
                  <Button
                    variant='outline'
                    disabled={close.isPending}
                    onClick={() => close.mutate({ params: { eventUid: event.uid } })}
                  >
                    Закрыть
                  </Button>
                  <Button
                    variant='destructive'
                    disabled={remove.isPending}
                    onClick={() => remove.mutate({ params: { eventUid: event.uid } })}
                  >
                    Удалить
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className='flex items-center justify-center'>
              <div className='rounded-xl bg-gray-900 px-10 py-2 text-white'>
                <p>Мероприятий нет</p>
              </div>
            </div>
          )}
        </div>
      )}
      {isPending && (
        <div className='space-y-4'>
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton className='h-20 w-full' key={index} />
          ))}
        </div>
      )}
    </section>
  );
};

export default AdminEventsPage;
