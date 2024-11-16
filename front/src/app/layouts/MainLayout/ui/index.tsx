import { Link, Outlet } from "react-router-dom";

import { MainSidebar } from "@widgets/main-sidebar";
import { ProfileWidget } from "@widgets/profile/profile-widget";

import { useUser } from "@entities/user";

import { BellIcon, LogoIcon } from "@shared/icons";
import { Button } from "@shared/ui";

const MainLayout = () => {
  const { user } = useUser();

  return (
    <>
      <header className='border-b border-b-slate-300'>
        <div className=' flex items-center justify-between py-2 container'>
          <Link to='/'>
            <LogoIcon />
          </Link>
          <div className='flex items-center gap-8 relative'>
            <Button variant='ghost' size='icon' className='relative'>
              <BellIcon />
              <span className='absolute -top-1 -right-4 text-center py-[1px] px-[5px] rounded-xl bg-red-500 text-xs text-white'>
                99+
              </span>
            </Button>
            {user && <ProfileWidget user={user} />}
          </div>
        </div>
      </header>
      <main className='grid grid-cols-[300px_1fr] py-10 container text-slate-900'>
        <MainSidebar />
        <div className='ml-6'>
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default MainLayout;
