import { useEffect, useState } from "react";

import { Avatar, Input, Button, Skeleton } from "@shared/ui";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/ui/select";

import { useAdminUsersQuery } from "../api/useAdminUsersQuery";
import { useSetUserBanMutation, useSetUserRoleMutation } from "../api/useUserActionMutations";

const roles = ["USER", "ORG", "ADMIN", "SU"];

const AdminUsersPage = () => {
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isPending } = useAdminUsersQuery({ search: debounced });
  const setRole = useSetUserRoleMutation();
  const setBan = useSetUserBanMutation();

  return (
    <section className='space-y-6'>
      <Input
        placeholder='Поиск по имени, тегу или почте'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='max-w-md'
      />

      {data && (
        <div className='space-y-2'>
          {data.data.length > 0 ? (
            data.data.map((user) => (
              <div
                key={user.uid}
                className='flex items-center justify-between gap-6 rounded-xl border border-border px-5 py-3'
              >
                <div className='flex items-center gap-3'>
                  <Avatar
                    isEdit={false}
                    src={user.image ? user.image.fileUrl : "/images/user.webp"}
                    alt='avatar'
                    className='size-10 rounded-full'
                  />
                  <div>
                    <p className='font-medium'>{user.fullName}</p>
                    <p className='text-xs opacity-60'>
                      @{user.tag} · {user.mail}
                    </p>
                  </div>
                </div>
                <div className='flex shrink-0 items-center gap-2'>
                  <Select
                    value={user.role}
                    onValueChange={(role) => setRole.mutate({ params: { userUid: user.uid, role } })}
                  >
                    <SelectTrigger className='w-28'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    variant={user.banned ? "outline" : "destructive"}
                    disabled={setBan.isPending}
                    onClick={() =>
                      setBan.mutate({ params: { userUid: user.uid, banned: !user.banned } })
                    }
                  >
                    {user.banned ? "Разбан" : "Бан"}
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className='flex items-center justify-center'>
              <div className='rounded-xl bg-gray-900 px-10 py-2 text-white'>
                <p>Пользователи не найдены</p>
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

export default AdminUsersPage;
