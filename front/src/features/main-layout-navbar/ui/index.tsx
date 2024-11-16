/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

import { useUser } from "@entities/user";

import { paths } from "@shared/constants/react-router";
import { Button } from "@shared/ui";

import { profileSidebarItems, settingsSidebarItems } from "../constant";

export const MainLayoutNavbar = () => {
  const { pathname, state } = useLocation();
  const { user } = useUser();
  const navigate = useNavigate();

  const items = pathname.startsWith(paths.SETTINGS)
    ? settingsSidebarItems(user!.tag)
    : profileSidebarItems;

  return (
    <nav className='space-y-4'>
      {items.map((item) => (
        <Fragment key={item.link}>
          {typeof item.link === "string" && (
            <NavLink
              to={item.link === paths.PROFILE ? `${item.link}/${user?.tag}` : item.link}
              className={({ isActive }) =>
                isActive || (pathname === paths.ALL_EVENTS && item.title === "Мои мероприятия")
                  ? "flex items-center gap-3 shadow-sidebarItemShadow border border-slate-300 rounded-lg py-3 bg-slate-100 px-5"
                  : "flex items-center gap-3 shadow-sidebarItemShadow border border-slate-300 rounded-lg py-3 px-5 hover:bg-white"
              }
            >
              {item.icon}
              <p className='text-sm text-slate-900 leading-[171%]'>{item.title}</p>
            </NavLink>
          )}
          {typeof item.link === "number" && (
            <Button
              variant='link'
              onClick={() => navigate(state.prevPathName)}
              className='flex items-center justify-start gap-3 shadow-sidebarItemShadow border border-slate-300 rounded-lg py-5 w-full hover:bg-white'
            >
              {item.icon}
              <p className='text-sm text-slate-900 leading-[171%]'> {item.title}</p>
            </Button>
          )}
        </Fragment>
      ))}
    </nav>
  );
};
