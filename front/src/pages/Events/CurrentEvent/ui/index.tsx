/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useParams } from "react-router-dom";

import { RequestWidget } from "@widgets/request";

import {
  EEventStatus,
  ERegistrationKind,
  translateEvenType,
  useEventRegistrationSocket,
  useGetEventByUidQuery,
  useGetParticipantsQuery
} from "@entities/event";

import { RegisterToEvent } from "@features/register-to-event";

import { Heading, Skeleton } from "@shared/ui";

const CurrentEventPage = () => {
  const { eventUid } = useParams();
  const { data, isPending } = useGetEventByUidQuery({ eventUid: eventUid! });
  const { data: participantsData } = useGetParticipantsQuery({ eventUid: eventUid! });

  useEventRegistrationSocket(eventUid!);

  const participants = participantsData?.data ?? [];

  return (
    <div className='w-full space-y-10'>
      {data && (
        <>
          <RequestWidget
            description={data.data.description ?? ""}
            name={data.data.name}
            org={data.data.userName ?? ""}
            type={translateEvenType(data.data.type)}
            categoryId={data.data.categoryId ?? []}
          />

          <RegisterToEvent
            eventUid={eventUid!}
            disabled={data.data.status !== EEventStatus.WAITING}
          />

          <section className='space-y-4'>
            <Heading variant='h4'>Участники ({participants.length})</Heading>
            {participants.length > 0 ? (
              <div className='space-y-2'>
                {participants.map((participant) => (
                  <div
                    key={participant.registrationUid}
                    className='flex items-center justify-between rounded-lg border border-border px-4 py-3'
                  >
                    <span className='text-sm'>
                      {participant.kind === ERegistrationKind.TEAM
                        ? participant.teamName
                        : participant.userName}
                    </span>
                    <span className='text-xs opacity-60'>
                      {participant.kind === ERegistrationKind.TEAM
                        ? "Команда"
                        : `@${participant.userTag ?? ""}`}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-sm opacity-60'>Пока никто не зарегистрировался</p>
            )}
          </section>
        </>
      )}
      {isPending && <Skeleton className='w-full h-48' />}
    </div>
  );
};

export default CurrentEventPage;
