import { useMutation, useQuery } from "@tanstack/react-query";

import { queryClient } from "@shared/constants/tan-stack-query";
import { toast } from "@shared/model/use-toast";

import type { TPostGenerateTestingConfig, TToggleTaskConfig } from "./req";
import { getUserRec, patchToggleTask } from "./req";
import { getRoadmap, postGenerateTesting } from "./req";

export const usePostGenerateTestingMutation = (
  settings?: MutationSettings<typeof postGenerateTesting, TPostGenerateTestingConfig>
) =>
  useMutation({
    mutationKey: ["postGenerateTesting"],
    mutationFn: (params) =>
      postGenerateTesting({
        ...params,
        ...(params?.config && { config: params.config })
      }),
    onSuccess() {
      toast({
        className: "bg-green-600 text-white hover:bg-green-500",
        title: "Навык добавлен!"
      });
      queryClient.invalidateQueries({ queryKey: ["getUserSkills"] });
    },
    onError(error) {
      toast({
        className: "bg-red-800 text-white hover:bg-red-700",
        title: "мяу",
        description: `В ходе отправки запроса произошла ошибка: ${error.response.data.message}`
      });
    },
    ...settings?.options
  });

export const useGetRoadmapQuery = ({ config, options }: QuerySettings<typeof getRoadmap>) =>
  useQuery({
    queryKey: ["getRoadmap"],
    queryFn: () => getRoadmap({ config }),
    ...options
  });

export const usePatchToggleTaskMutation = (
  settings?: MutationSettings<typeof patchToggleTask, TToggleTaskConfig>
) =>
  useMutation({
    mutationKey: ["patchToggleTask"],
    mutationFn: (params) =>
      patchToggleTask({
        ...params,
        ...(params?.config && { config: params.config })
      }),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["getRoadmap"] });
    },
    ...settings?.options
  });

export const useGetUsersRecQuery = ({ config, options }: QuerySettings<typeof getUserRec>) =>
  useQuery({
    queryKey: ["getUserRec"],
    queryFn: () => getUserRec({ config }),
    ...options
  });
