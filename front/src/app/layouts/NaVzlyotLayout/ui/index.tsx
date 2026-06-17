import { Link, Outlet } from "react-router-dom";

import { MainSidebar } from "@widgets/main-sidebar";
import { NotificationsBell } from "@widgets/notifications-bell";
import { ProfileWidget } from "@widgets/profile/profile-widget";

import { useUser } from "@entities/user";

import { LogoIcon } from "@shared/icons";

const MainLayout = () => {
  const { user } = useUser();

  return (
    <>
      <header className='border-b border-b-border'>
        <div className=' flex items-center justify-between py-2 container'>
          <Link to='/'>
            <LogoIcon />
          </Link>
          <div className='flex items-center gap-8 relative'>
            <NotificationsBell />
            {user && <ProfileWidget user={user} />}
          </div>
        </div>
      </header>
      <main className='grid grid-cols-[300px_1fr] py-10 container text-foreground'>
        <MainSidebar />
        <div className='ml-6'>
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default MainLayout;
