import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@shared/constants/tan-stack-query";
import { toast } from "@shared/model/use-toast";

import { deleteProfileFile } from "../requests/deleteProfileFile";

export const useDeleteFileMutation = (
  settings?: MutationSettings<typeof deleteProfileFile, IUidConfig>
) =>
  useMutation({
    mutationKey: ["deleteProfileFile"],
    mutationFn: (params) =>
      deleteProfileFile({ ...params, ...(params?.config && { config: params.config }) }),
    onSuccess() {
      toast({
        className: "bg-green-600 text-white hover:bg-green-500",
        title: "Документ успешно удален!"
      });
      queryClient.invalidateQueries({ queryKey: ["getUserEducation"] });
    },
    onError(error) {
      toast({
        className: "bg-red-800 text-white hover:bg-red-700",
        title: "Не удалось удалить документ",
        description: `В ходе отправки запроса произошла ошибка: ${error.response.data.message}`
      });
    },
    ...settings?.options
  });
