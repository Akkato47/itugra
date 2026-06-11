import { Link } from "react-router-dom";

import { paths } from "@shared/constants/react-router";
import { buttonVariants } from "@shared/constants/shade-cn";

import type { IAuthResponse } from "../api/types";

interface IToAuthLinkProps {
  user: IAuthResponse | undefined;
}

export const ToAuthLink = ({ user }: IToAuthLinkProps) => (
  <>
    {user ? (
      <Link to={`${paths.PROFILE}/${user.tag}`} className={buttonVariants({ variant: "default" })}>
        Профиль
      </Link>
    ) : (
      <Link to={paths.SIGNIN} className={buttonVariants({ variant: "default" })}>
        Войти
      </Link>
    )}
  </>
);
