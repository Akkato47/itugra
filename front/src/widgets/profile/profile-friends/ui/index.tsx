import {
  FriendCard,
  useAcceptFriendRequestMutation,
  useDeclineFriendRequestMutation,
  useFriendRequestsQuery,
  useFriendsQuery,
  useRemoveFriendMutation
} from "@entities/friend";

import { Button, Heading } from "@shared/ui";

interface IProfileFriendsProps {
  tag: string;
  isOwner: boolean;
}

export const ProfileFriends = ({ tag, isOwner }: IProfileFriendsProps) => {
  const { data: friendsData, isSuccess } = useFriendsQuery({ tag });
  const { data: requestsData } = useFriendRequestsQuery({
    options: { enabled: isOwner }
  });

  const accept = useAcceptFriendRequestMutation();
  const decline = useDeclineFriendRequestMutation();
  const remove = useRemoveFriendMutation();

  const friends = friendsData?.data ?? [];
  const incoming = requestsData?.data.incoming ?? [];
  const outgoing = requestsData?.data.outgoing ?? [];

  return (
    <div className='w-full max-w-[840px] space-y-8'>
      {isOwner && incoming.length !== 0 && (
        <section className='space-y-4'>
          <Heading variant='h3' tag='h3'>
            Заявки в друзья
          </Heading>
          <div className='flex flex-wrap gap-4'>
            {incoming.map((request) => (
              <FriendCard key={request.requestUid} friend={request}>
                <div className='flex items-center gap-2'>
                  <Button
                    disabled={accept.isPending}
                    onClick={() =>
                      accept.mutate({ params: { requestUid: request.requestUid } })
                    }
                  >
                    Принять
                  </Button>
                  <Button
                    variant='outline'
                    disabled={decline.isPending}
                    onClick={() =>
                      decline.mutate({ params: { requestUid: request.requestUid } })
                    }
                  >
                    Отклонить
                  </Button>
                </div>
              </FriendCard>
            ))}
          </div>
        </section>
      )}

      {isOwner && outgoing.length !== 0 && (
        <section className='space-y-4'>
          <Heading variant='h3' tag='h3'>
            Исходящие заявки
          </Heading>
          <div className='flex flex-wrap gap-4'>
            {outgoing.map((request) => (
              <FriendCard key={request.requestUid} friend={request}>
                <Button
                  variant='outline'
                  disabled={decline.isPending}
                  onClick={() =>
                    decline.mutate({ params: { requestUid: request.requestUid } })
                  }
                >
                  Отменить заявку
                </Button>
              </FriendCard>
            ))}
          </div>
        </section>
      )}

      <section className='space-y-4'>
        <Heading variant='h3' tag='h3'>
          Друзья
        </Heading>
        {isSuccess && friends.length === 0 && (
          <p className='opacity-50 leading-[175%]'>Список друзей пуст</p>
        )}
        <div className='flex flex-wrap gap-4'>
          {friends.map((friend) => (
            <FriendCard key={friend.uid} friend={friend}>
              {isOwner && (
                <Button
                  variant='outline'
                  disabled={remove.isPending}
                  onClick={() => remove.mutate({ params: { tag: friend.tag } })}
                >
                  Удалить
                </Button>
              )}
            </FriendCard>
          ))}
        </div>
      </section>
    </div>
  );
};
