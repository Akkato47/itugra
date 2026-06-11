import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@shared/constants/tan-stack-query";
import { toast } from "@shared/model/use-toast";

import type { TPostProfileFileConfig } from "../requests/postProfileFile";
import { postProfileFile } from "../requests/postProfileFile";

export const useCreateProfileFileMutation = (
  settings?: MutationSettings<typeof postProfileFile, TPostProfileFileConfig>
) =>
  useMutation({
    mutationKey: ["postProfileFile"],
    mutationFn: (params) =>
      postProfileFile({
        ...params,
        ...(params?.config && { config: params.config })
      }),
    onSuccess() {
      toast({
        className: "bg-green-800 text-white hover:bg-green-700",
        title: "Файл успешно загружен!"
      });
      queryClient.invalidateQueries({ queryKey: ["getUserEducation"] });
    },
    onError(error) {
      toast({
        className: "bg-red-800 text-white hover:bg-red-700",
        title: "Не удалось загрузить файл",
        description: `В ходе отправки запроса произошла ошибка: ${error.response.data.message}`
      });
    },
    ...settings?.options
  });
