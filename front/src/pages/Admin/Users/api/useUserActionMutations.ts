import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@shared/constants/tan-stack-query";
import { toast } from "@shared/model/use-toast";

import type { TSetBanConfig, TSetRoleConfig } from "./userActions";
import { setUserBan, setUserRole } from "./userActions";

const onError = (error: any) =>
  toast({
    className: "bg-red-800 text-white hover:bg-red-700",
    title: "Не удалось обновить пользователя",
    description: error.response?.data?.message ?? "Попробуйте ещё раз позже"
  });

const onDone = (title: string) => {
  queryClient.invalidateQueries({ queryKey: ["getAdminUsers"] });
  toast({ className: "bg-green-600 text-white hover:bg-green-500", title });
};

export const useSetUserRoleMutation = (
  settings?: MutationSettings<typeof setUserRole, TSetRoleConfig>
) =>
  useMutation({
    mutationKey: ["adminSetUserRole"],
    mutationFn: (params) =>
      setUserRole({ ...params, ...(params?.config && { config: params.config }) }),
    ...settings?.options,
    onSuccess(...args) {
      onDone("Роль обновлена");
      settings?.options?.onSuccess?.(...args);
    },
    onError(...args) {
      onError(args[0]);
      settings?.options?.onError?.(...args);
    }
  });

export const useSetUserBanMutation = (
  settings?: MutationSettings<typeof setUserBan, TSetBanConfig>
) =>
  useMutation({
    mutationKey: ["adminSetUserBan"],
    mutationFn: (params) =>
      setUserBan({ ...params, ...(params?.config && { config: params.config }) }),
    ...settings?.options,
    onSuccess(...args) {
      onDone("Статус блокировки обновлён");
      settings?.options?.onSuccess?.(...args);
    },
    onError(...args) {
      onError(args[0]);
      settings?.options?.onError?.(...args);
    }
  });
