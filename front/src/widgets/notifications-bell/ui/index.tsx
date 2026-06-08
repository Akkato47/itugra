import { useNavigate } from "react-router-dom";

import {
  useMarkAllReadMutation,
  useMarkReadMutation,
  useNotificationsQuery,
  useNotificationsSocket,
  useUnreadCountQuery
} from "@entities/notification";
import type { INotification } from "@entities/notification";

import { paths } from "@shared/constants/react-router";
import { BellIcon } from "@shared/icons";
import { cn } from "@shared/lib/shade-cn";
import { Button } from "@shared/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@shared/ui/dropdown-menu";

export const NotificationsBell = () => {
  const navigate = useNavigate();

  useNotificationsSocket();

  const { data: countData } = useUnreadCountQuery();
  const { data: listData } = useNotificationsQuery();
  const markRead = useMarkReadMutation();
  const markAllRead = useMarkAllReadMutation();

  const unread = countData?.data.count ?? 0;
  const notifications = listData?.data ?? [];

  const handleSelect = (notification: INotification) => {
    if (!notification.isRead) {
      markRead.mutate({ params: { uid: notification.uid } });
    }

    if (notification.payload?.actorTag) {
      navigate(`${paths.PROFILE}/${notification.payload.actorTag}`);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='relative'>
          <BellIcon />
          {unread > 0 && (
            <span className='absolute -top-1 -right-4 text-center py-[1px] px-[5px] rounded-xl bg-red-500 text-xs text-white'>
              {unread > 99 ? "99+" : unread}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-80 max-h-96 overflow-y-auto'>
        <div className='flex items-center justify-between px-2 py-1.5'>
          <p className='font-medium leading-[150%]'>Уведомления</p>
          {unread > 0 && (
            <button
              type='button'
              onClick={() => markAllRead.mutate()}
              className='text-xs text-blue-500 hover:underline'
            >
              Прочитать все
            </button>
          )}
        </div>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <p className='px-2 py-6 text-center text-sm opacity-50'>Нет уведомлений</p>
        ) : (
          notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.uid}
              onSelect={() => handleSelect(notification)}
              className={cn(
                "flex flex-col items-start gap-0.5 cursor-pointer",
                !notification.isRead && "bg-blue-50"
              )}
            >
              <span className='text-sm font-medium leading-[150%]'>{notification.title}</span>
              <span className='text-xs opacity-70 leading-[150%]'>{notification.message}</span>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
