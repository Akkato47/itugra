import { useState } from "react";

import {
  EModerationStatus,
  moderationStatusColor,
  translateEvenType,
  translateModerationStatus,
  useGetAllRequestsQuery
} from "@entities/event";

import { cn } from "@shared/lib/shade-cn";
import { Button, Heading, Skeleton } from "@shared/ui";

import { useRequestDecisionMutation } from "../api/useRequestDecisionMutation";

const filters: { label: string; value: EModerationStatus | "ALL" }[] = [
  { label: "Все", value: "ALL" },
  { label: "На модерации", value: EModerationStatus.PENDING },
  { label: "Одобренные", value: EModerationStatus.APPROVED },
  { label: "Отклонённые", value: EModerationStatus.REJECTED }
];

const AdminModerationPage = () => {
  const { data, isPending } = useGetAllRequestsQuery({});
  const decision = useRequestDecisionMutation();
  const [filter, setFilter] = useState<EModerationStatus | "ALL">("ALL");

  const requests = (data?.data ?? []).filter(
    (request) => filter === "ALL" || request.moderationStatus === filter
  );

  return (
    <section className='space-y-6'>
      <div className='flex flex-wrap items-center gap-3'>
        {filters.map((item) => (
          <Button
            key={item.value}
            variant={filter === item.value ? "default" : "outline"}
            onClick={() => setFilter(item.value)}
          >
            {item.label}
          </Button>
        ))}
      </div>

      {data && (
        <div className='space-y-6'>
          {requests.length > 0 ? (
            requests.map((request) => (
              <div
                key={request.uid}
                className='flex items-start justify-between gap-10 rounded-xl px-9 py-6 shadow-lg'
              >
                <div className='space-y-2'>
                  <div className='flex items-center gap-3'>
                    <Heading variant='h3' className='text-brand'>
                      {request.name}
                    </Heading>
                    <span
                      className={cn(
                        "rounded-full px-3 py-1 text-xs text-white",
                        moderationStatusColor(request.moderationStatus)
                      )}
                    >
                      {translateModerationStatus(request.moderationStatus)}
                    </span>
                  </div>
                  <p className='text-sm opacity-60'>{translateEvenType(request.type)}</p>
                  <p className='text-sm leading-[171%]'>{request.description}</p>
                  {request.moderationReason && (
                    <p className='text-sm text-slate-500'>ИИ: {request.moderationReason}</p>
                  )}
                </div>
                <div className='flex shrink-0 flex-col gap-2'>
                  <Button
                    disabled={
                      decision.isPending ||
                      request.moderationStatus === EModerationStatus.APPROVED
                    }
                    onClick={() =>
                      decision.mutate({ params: { requestUid: request.uid, decision: true } })
                    }
                  >
                    Одобрить
                  </Button>
                  <Button
                    variant='destructive'
                    disabled={
                      decision.isPending ||
                      request.moderationStatus === EModerationStatus.REJECTED
                    }
                    onClick={() =>
                      decision.mutate({ params: { requestUid: request.uid, decision: false } })
                    }
                  >
                    Отклонить
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className='flex items-center justify-center'>
              <div className='rounded-xl bg-gray-900 px-10 py-2 text-white'>
                <p>Заявок нет</p>
              </div>
            </div>
          )}
        </div>
      )}

      {isPending && (
        <div className='space-y-6'>
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton className='h-20 w-full' key={index} />
          ))}
        </div>
      )}
    </section>
  );
};

export default AdminModerationPage;
