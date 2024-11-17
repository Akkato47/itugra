import { api } from "@shared/api";

export type NumCategory = 1 | 2 | 3 | 4;

interface IGenerateTesting {
  category: NumCategory;
}

export type TPostGenerateTestingConfig = TRequestConfig<IGenerateTesting>;

export interface Quest {
  questionBody: string;
  answers: { body: string }[];
}

export type PostGenerateTestingResponse = Quest[];

export const postGenerateTesting = ({ params, config }: TPostGenerateTestingConfig) =>
  api.post<PostGenerateTestingResponse>("/test/generate", params, config);

export interface ITask {
  uid: string;
  name: string;
  order: number;
  done: boolean;
}

export const getRoadmap = ({ config }: TRequestConfig) => api.get<ITask[]>("/user/roadmap", config);

interface IToggleTask {
  uid: string;
}
export type TToggleTaskConfig = TRequestConfig<IToggleTask>;

export const patchToggleTask = ({ params, config }: TToggleTaskConfig) =>
  api.patch<PostGenerateTestingResponse>(`/user/roadmap/${params.uid}`, {}, config);
