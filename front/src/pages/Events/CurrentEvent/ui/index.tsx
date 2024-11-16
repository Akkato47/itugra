/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useParams } from "react-router-dom";

import { RequestWidget } from "@widgets/request";

import { translateEvenType, useGetEventByUidQuery } from "@entities/event";

import { Skeleton } from "@shared/ui";

const CurrentEventPage = () => {
  const { eventUid } = useParams();
  const { data, isPending } = useGetEventByUidQuery({ eventUid: eventUid! });

  return (
    <div className='w-full space-y-10'>
      {data && (
        <RequestWidget
          description={data.data.description}
          name={data.data.name}
          org={data.data.userName}
          type={translateEvenType(data.data.type)}
          categoryId={data.data.categoryId}
        />
      )}
      {isPending && <Skeleton className='w-full h-48' />}
    </div>
  );
};

export default CurrentEventPage;
