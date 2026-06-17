import { useEffect, useState } from "react";

import { Avatar, Button, Input, Skeleton } from "@shared/ui";

import { useAdminTeamsQuery } from "../api/useAdminTeamsQuery";
import { useDeleteTeamMutation, useSetTeamBanMutation } from "../api/useTeamActionMutations";

const AdminTeamsPage = () => {
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isPending } = useAdminTeamsQuery({ search: debounced });
  const setBan = useSetTeamBanMutation();
  const remove = useDeleteTeamMutation();

  return (
    <section className='space-y-6'>
      <Input
        placeholder='Поиск по названию команды'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='max-w-md'
      />

      {data && (
        <div className='space-y-2'>
          {data.data.length > 0 ? (
            data.data.map((team) => {
              const banned = team.type === "BANNED";

              return (
                <div
                  key={team.uid}
                  className='flex items-center justify-between gap-6 rounded-xl border border-border px-5 py-3'
                >
                  <div className='flex items-center gap-3'>
                    <Avatar
                      isEdit={false}
                      src={team.image ? team.image.fileUrl : "/images/user.webp"}
                      alt='team'
                      className='size-10 rounded-full'
                    />
                    <div>
                      <p className='font-medium'>{team.name}</p>
                      <p className='text-xs opacity-60'>
                        {team.type} · участников: {team.members}
                      </p>
                    </div>
                  </div>
                  <div className='flex shrink-0 items-center gap-2'>
                    <Button
                      variant={banned ? "outline" : "destructive"}
                      disabled={setBan.isPending}
                      onClick={() => setBan.mutate({ params: { teamUid: team.uid, banned: !banned } })}
                    >
                      {banned ? "Разбан" : "Бан"}
                    </Button>
                    <Button
                      variant='destructive'
                      disabled={remove.isPending}
                      onClick={() => remove.mutate({ params: { teamUid: team.uid } })}
                    >
                      Удалить
                    </Button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className='flex items-center justify-center'>
              <div className='rounded-xl bg-gray-900 px-10 py-2 text-white'>
                <p>Команды не найдены</p>
              </div>
            </div>
          )}
        </div>
      )}

      {isPending && (
        <div className='space-y-2'>
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton className='h-16 w-full' key={index} />
          ))}
        </div>
      )}
    </section>
  );
};

export default AdminTeamsPage;
