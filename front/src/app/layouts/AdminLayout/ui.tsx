import { Link, NavLink, Navigate, Outlet } from "react-router-dom";

import { NotificationsBell } from "@widgets/notifications-bell";

import { useUser } from "@entities/user";

import { paths } from "@shared/constants/react-router";
import { buttonVariants } from "@shared/constants/shade-cn";
import { LogoIcon } from "@shared/icons";
import { Avatar } from "@shared/ui";

const navItems = [
  { to: paths.ADMIN, label: "Дашборд", end: true },
  { to: paths.ADMIN_MODERATION, label: "Модерация", end: false },
  { to: paths.ADMIN_EVENTS, label: "Мероприятия", end: false },
  { to: paths.ADMIN_USERS, label: "Пользователи", end: false },
  { to: paths.ADMIN_TEAMS, label: "Команды", end: false }
];

const AdminLayout = () => {
  const { user } = useUser();

  if (!user || user.role !== "ADMIN") {
    return <Navigate to={paths.PROFILE} replace />;
  }

  return (
    <>
      <header className='border-b border-b-border'>
        <div className=' flex items-center justify-between py-2 container'>
          <Link to='/'>
            <LogoIcon />
          </Link>
          <div className='flex items-center gap-8 relative'>
            <NotificationsBell />
            {user && (
              <Avatar
                src={user.image ? user.image.fileUrl : "/images/user.webp"}
                alt='your avatar'
                className='size-10 rounded-full'
                isEdit={false}
              />
            )}
          </div>
        </div>
      </header>
      <main className='py-10 flex flex-col gap-10 container text-foreground'>
        <nav className='flex flex-wrap items-center gap-6'>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                isActive
                  ? buttonVariants({ variant: "default" })
                  : buttonVariants({ variant: "outline" })
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <section className='ml-6'>
          <Outlet />
        </section>
      </main>
    </>
  );
};

export default AdminLayout;
