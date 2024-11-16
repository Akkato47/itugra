import { useEffect } from "react";

import { EoAuth } from "@features/o-auth/types";

import { Spinner } from "@shared/ui/spinner";

import { postoAuth } from "../api/postoAuth";

const YandexCallbackPage = () => {
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");

    if (code) {
      postoAuth({
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
