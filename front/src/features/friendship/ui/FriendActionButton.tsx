import {
  useAcceptFriendRequestMutation,
  useDeclineFriendRequestMutation,
  useFriendshipStatusQuery,
  useRemoveFriendMutation,
  useSendFriendRequestMutation
} from "@entities/friend";

import { Button } from "@shared/ui";

interface IFriendActionButtonProps {
  tag: string;
}

export const FriendActionButton = ({ tag }: IFriendActionButtonProps) => {
  const { data, isLoading } = useFriendshipStatusQuery({ tag });
  const send = useSendFriendRequestMutation();
  const accept = useAcceptFriendRequestMutation();
  const decline = useDeclineFriendRequestMutation();
  const remove = useRemoveFriendMutation();

  const status = data?.data.status;
  const requestUid = data?.data.requestUid;

  if (isLoading || !status || status === "SELF") return null;

  const isPending =
    send.isPending || accept.isPending || decline.isPending || remove.isPending;

  if (status === "NONE")
    return (
      <Button
        variant='outline'
        disabled={isPending}
        onClick={() => send.mutate({ params: { tag } })}
      >
        Добавить в друзья
      </Button>
    );

  if (status === "OUTGOING")
    return (
      <Button
        variant='outline'
        disabled={isPending || !requestUid}
        onClick={() => requestUid && decline.mutate({ params: { requestUid } })}
      >
        Отменить заявку
      </Button>
    );

  if (status === "INCOMING")
    return (
      <div className='flex items-center gap-2'>
        <Button
          disabled={isPending || !requestUid}
          onClick={() => requestUid && accept.mutate({ params: { requestUid } })}
        >
          Принять
        </Button>
        <Button
          variant='outline'
          disabled={isPending || !requestUid}
          onClick={() => requestUid && decline.mutate({ params: { requestUid } })}
        >
          Отклонить
        </Button>
      </div>
    );

  return (
    <Button
      variant='outline'
      disabled={isPending}
      onClick={() => remove.mutate({ params: { tag } })}
    >
      Удалить из друзей
    </Button>
  );
};
