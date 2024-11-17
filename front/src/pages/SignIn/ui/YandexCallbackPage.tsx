import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useOAuthMutation } from "@features/o-auth";
import { EoAuth } from "@features/o-auth/types";

import { useUser } from "@entities/user";

import { paths } from "@shared/constants/react-router";
import { Spinner } from "@shared/ui/spinner";

const YandexCallbackPage = () => {
  const navigate = useNavigate();
  const { setUserContextData } = useUser();

  const { mutate } = useOAuthMutation({
    options: {
      onSuccess(data) {
        setUserContextData(data.data);
        return navigate(paths.SETTINGS + "/skills");
      }
    }
  });

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");

    if (code) {
      mutate({
        params: {
          type: EoAuth.YANDEX,
          code: `${code}`
        }
      });
    }
  }, []);

  return <Spinner />;
};

export default YandexCallbackPage;
