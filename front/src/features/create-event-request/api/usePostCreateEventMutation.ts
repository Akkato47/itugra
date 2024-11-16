import { useMutation } from "@tanstack/react-query";

import { toast } from "@shared/model/use-toast";

import type { TPostCreateEventConfig } from "./postCreateEvent";
import { postCreateEvent } from "./postCreateEvent";

export const usePostCreateEventMutation = (
  settings?: MutationSettings<typeof postCreateEvent, TPostCreateEventConfig>
) =>
  useMutation({
    mutationKey: ["postCreateEvent"],
    mutationFn: (params) =>
      postCreateEvent({
        ...params,
        ...(params?.config && { config: params.config })
      }),
    onSuccess() {
      toast({
        className: "bg-green-600 text-white hover:bg-green-500",
        title: "Заявка на создание мероприятия отправлена!"
      });
    },
    onError(error) {
      toast({
        className: "bg-red-800 text-white hover:bg-red-700",
        title: "Не удалось отправить заявку",
        description: `В ходе отправки запроса произошла ошибка: ${error.response.data.message}`
      });
    },
    ...settings?.options
  });
