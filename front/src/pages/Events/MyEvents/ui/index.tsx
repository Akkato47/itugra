import { Link } from "react-router-dom";

import { ERegistrationKind, useGetMyRegistrationsQuery } from "@entities/event";

import { useCancelRegistrationMutation } from "@features/register-to-event";

import { paths } from "@shared/constants/react-router";
import { Button, Heading, Skeleton } from "@shared/ui";

const MyEventsPage = () => {
  const { data, isPending } = useGetMyRegistrationsQuery({});
  const cancel = useCancelRegistrationMutation();

  return (
    <section className='space-y-6'>
      <div className='w-full'>
        {data && (
          <div className='space-y-6'>
            {data.data.length > 0 ? (
              data.data.map((registration) => (
                <div
                  key={registration.registrationUid}
                  className='flex items-center justify-between gap-10 py-6 px-9 shadow-lg rounded-xl'
                >
                  <Link
                    to={`${paths.PROFILE}/${paths.EVENT}/${registration.eventUid}`}
                    className='space-y-2'
                  >
                    <Heading variant='h3' className='text-brand'>
                      {registration.eventName}
                    </Heading>
                    <p className='leading-[171%] text-sm opacity-60'>
                      {registration.kind === ERegistrationKind.TEAM
                        ? `Команда: ${registration.teamName ?? "—"}`
                        : "Индивидуальное участие"}
                    </p>
                  </Link>
                  <Button
                    variant='outline'
                    disabled={cancel.isPending}
                    onClick={() =>
                      cancel.mutate({
                        params: { registrationUid: registration.registrationUid }
                      })
                    }
                  >
                    Отменить
                  </Button>
                </div>
              ))
            ) : (
              <div className='flex items-center justify-center'>
                <div className='rounded-xl text-white px-10 py-2 bg-gray-900'>
                  <p>Вы пока никуда не записаны</p>
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

export default MyEventsPage;
