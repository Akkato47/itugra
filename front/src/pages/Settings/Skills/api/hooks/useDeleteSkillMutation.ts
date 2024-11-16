import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@shared/constants/tan-stack-query";
import { toast } from "@shared/model/use-toast";

import { deleteSkill } from "../requests/deleteSKill";

export const useDeleteSkillMutation = (
  settings?: MutationSettings<typeof deleteSkill, IUidConfig>
) =>
  useMutation({
    mutationKey: ["deleteSkill"],
    mutationFn: (params) =>
      deleteSkill({ ...params, ...(params?.config && { config: params.config }) }),
    async onSuccess() {
      toast({
        className: "bg-green-600 text-white hover:bg-green-500",
        title: "Навык успешно удален!"
      });
      await queryClient.invalidateQueries({ queryKey: ["getUserSkills"] });
    },
    onError(error) {
      toast({
        className: "bg-red-800 text-white hover:bg-red-700",
        title: "Не удалось удалить навык",
        description: `В ходе отправки запроса произошла ошибка: ${error.response.data.message}`
      });
    },
    ...settings?.options
  });
