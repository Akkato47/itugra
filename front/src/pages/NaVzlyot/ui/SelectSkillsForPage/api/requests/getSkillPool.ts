import { api } from "@shared/api";

export interface ISkill {
  uid: string;
  name: string;
}

export const getSkillPool = ({ config, search }: TRequestConfig & { search?: string }) =>
  api.get<ISkill[]>("/user/skill-pool", { ...config, params: { search } });
