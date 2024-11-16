import { PlusIcon } from "@radix-ui/react-icons";
import { NavLink, Outlet } from "react-router-dom";

import { paths } from "@shared/constants/react-router";
import { buttonVariants } from "@shared/constants/shade-cn";

const EventLayout = () => (
  <>
    <main className='pb-10 flex flex-col gap-10 container text-slate-900'>
      <nav className='flex items-center gap-6'>
        <NavLink
          to={paths.MY_EVENTS}
          className={({ isActive }) =>
            isActive
              ? buttonVariants({ variant: "default" })
              : buttonVariants({ variant: "outline" })
          }
        >
          Мои мероприятия
        </NavLink>
        <NavLink
          to={paths.ALL_EVENTS}
          className={({ isActive }) =>
            isActive
              ? buttonVariants({ variant: "default" })
              : buttonVariants({ variant: "outline" })
          }
        >
          Все мероприятия
        </NavLink>
        <NavLink
          to={paths.PROFILE + "/" + paths.CREATE_EVENT}
          className={({ isActive }) =>
            isActive
              ? buttonVariants({ variant: "default" })
              : buttonVariants({ variant: "outline" })
          }
        >
          Создать мероприятие
          <PlusIcon className='ml-2' />
        </NavLink>
      </nav>
      <Outlet />
    </main>
  </>
);

export default EventLayout;
