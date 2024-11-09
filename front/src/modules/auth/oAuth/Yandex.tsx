import { useEffect } from "react";

import { Spinner } from "@shared/ui/spinner";

import { postoAuth } from "./api/postoAuth";
import { EoAuth } from "./types";

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
