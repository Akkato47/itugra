import { ExitIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";

import { useUser } from "@entities/user";

import { Button } from "@shared/ui/button";

import { useLogoutMutation } from "../api/hooks/useLogoutMutation";

export const LogoutButton = () => {
  const navigate = useNavigate();
  const { setUserContextData } = useUser();
  const { mutate } = useLogoutMutation({
    options: {
      onSuccess() {
        setUserContextData(undefined);
        navigate("/");
      }
    }
  });

  return (
    <Button
      onClick={() => mutate({})}
      variant='ghost'
      className='flex items-center gap-2 w-full justify-start px-4'
    >
      <ExitIcon className='size-5' />
      <p className='leading-[143%] text-base font-normal'>Выйти</p>
    </Button>
  );
};
