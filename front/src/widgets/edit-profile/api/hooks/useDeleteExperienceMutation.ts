import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@shared/constants/tan-stack-query";
import { toast } from "@shared/model/use-toast";

import { deleteExperience } from "../requests/deleteExperience";

export const useDeleteExperienceMutation = (
  settings?: MutationSettings<typeof deleteExperience, IUidConfig>
) =>
  useMutation({
    mutationKey: ["deleteExperience"],
    mutationFn: (params) =>
      deleteExperience({ ...params, ...(params?.config && { config: params.config }) }),
    async onSuccess() {
      toast({
        className: "bg-green-600 text-white hover:bg-green-500",
        title: "Опыт успешно работы удален!"
      });
      await queryClient.invalidateQueries({ queryKey: ["getUserExperience"] });
    },
    onError(error) {
      toast({
        className: "bg-red-800 text-white hover:bg-red-700",
        title: "Не удалось удалить опыт работы",
        description: `В ходе отправки запроса произошла ошибка: ${error.response.data.message}`
      });
    },
    ...settings?.options
  });
