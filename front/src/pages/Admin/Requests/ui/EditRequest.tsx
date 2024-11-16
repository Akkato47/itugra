/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { RequestWidget } from "@widgets/request";

import { translateEvenType, useGetRequestByUidQuery } from "@entities/event";

import { paths } from "@shared/constants/react-router";
import { queryClient } from "@shared/constants/tan-stack-query";
import { toast } from "@shared/model/use-toast";
import { Button, Skeleton } from "@shared/ui";

import { useDisicionRequestMutation } from "../api/hooks/useDisicionRequestMutation";

const EditRequestPage = () => {
  const { requestUid, isPending } = useParams();
  const { data } = useGetRequestByUidQuery({ requestUid: requestUid! });
  const { state } = useLocation();
  const navigate = useNavigate();
  const { mutateAsync } = useDisicionRequestMutation({
    options: {
      onSuccess() {
        toast({
          className: "bg-green-600 text-white hover:bg-green-500",
          title: "Заявка закрыта"
        });
        queryClient.invalidateQueries({ queryKey: ["getAllRequest"] });
        queryClient.invalidateQueries({ queryKey: ["getAllEvents"] });
        navigate(`${paths.ADMIN}/${paths.ADMIN_REQUESTS}`);
      },
      onError(error) {
        toast({
          className: "bg-red-800 text-white hover:bg-red-700",
          title: "Не удалось закрыть заявку",
          description: `В ходе отправки запроса произошла ошибка: ${error.response.data.message}`
        });
      }
    }
  });

  const desicionRequest = async (desicion: boolean) =>
    mutateAsync({
      params: {
        decision: desicion,
        requestUid: requestUid!
      }
    });

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
      {state && (
        <div className='flex items-center justify-end gap-4'>
          <Button onClick={() => desicionRequest(true)} variant='default'>
            Подтвердить
          </Button>
          <Button onClick={() => desicionRequest(false)} variant='destructive'>
            Отклонить
          </Button>
        </div>
      )}
    </div>
  );
};

export default EditRequestPage;
