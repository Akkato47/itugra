import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@shared/constants/tan-stack-query";
import { toast } from "@shared/model/use-toast";

import type { TEventActionConfig } from "./eventActions";
import { closeEvent, deleteEvent } from "./eventActions";

const onError = (error: any) =>
  toast({
    className: "bg-red-800 text-white hover:bg-red-700",
    title: "Не удалось выполнить действие",
    description: error.response?.data?.message ?? "Попробуйте ещё раз позже"
  });

const invalidate = () => {
  queryClient.invalidateQueries({ queryKey: ["getAllEvents"] });
  queryClient.invalidateQueries({ queryKey: ["getAdminStats"] });
};

export const useCloseEventMutation = (
  settings?: MutationSettings<typeof closeEvent, TEventActionConfig>
) =>
  useMutation({
    mutationKey: ["adminCloseEvent"],
    mutationFn: (params) =>
      closeEvent({ ...params, ...(params?.config && { config: params.config }) }),
    ...settings?.options,
    onSuccess(...args) {
      invalidate();
      toast({
        className: "bg-green-600 text-white hover:bg-green-500",
        title: "Регистрация закрыта"
      });
      settings?.options?.onSuccess?.(...args);
    },
    onError(...args) {
      onError(args[0]);
      settings?.options?.onError?.(...args);
    }
  });

export const useDeleteEventMutation = (
  settings?: MutationSettings<typeof deleteEvent, TEventActionConfig>
) =>
  useMutation({
    mutationKey: ["adminDeleteEvent"],
    mutationFn: (params) =>
      deleteEvent({ ...params, ...(params?.config && { config: params.config }) }),
    ...settings?.options,
    onSuccess(...args) {
      invalidate();
      toast({
        className: "bg-green-600 text-white hover:bg-green-500",
        title: "Мероприятие удалено"
      });
      settings?.options?.onSuccess?.(...args);
    },
    onError(...args) {
      onError(args[0]);
      settings?.options?.onError?.(...args);
    }
  });
