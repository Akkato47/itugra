import { Link, NavLink, Outlet, useMatch } from "react-router-dom";

import { useUser } from "@entities/user";

import { paths } from "@shared/constants/react-router";
import { buttonVariants } from "@shared/constants/shade-cn";
import { BellIcon, LogoIcon } from "@shared/icons";
import { Avatar, Button } from "@shared/ui";

const AdminLayout = () => {
  const { user } = useUser();
  const f = useMatch(`${paths.ADMIN}/:requestUid`);
  let isValidUid;

  if (f?.params?.requestUid) {
    const uid = f.params.requestUid;
    isValidUid =
      /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/.test(uid);
  }
  console.log(user?.image);

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
      <main className='py-10 flex flex-col gap-10 container text-slate-900'>
        {!isValidUid && (
          <nav className='flex items-center gap-6'>
            <NavLink
              to={paths.ADMIN_REQUESTS}
              className={({ isActive }) =>
                isActive
                  ? buttonVariants({ variant: "default" })
                  : buttonVariants({ variant: "outline" })
              }
            >
              Активные заявки
            </NavLink>
            <NavLink
              to={paths.ADMIN_REQUESTS_HISTORY}
              className={({ isActive }) =>
                isActive
                  ? buttonVariants({ variant: "default" })
                  : buttonVariants({ variant: "outline" })
              }
            >
              История заявок
            </NavLink>
          </nav>
        )}
        <section className='ml-6'>
          <Outlet />
        </section>
      </main>
    </>
  );
};

export default AdminLayout;
