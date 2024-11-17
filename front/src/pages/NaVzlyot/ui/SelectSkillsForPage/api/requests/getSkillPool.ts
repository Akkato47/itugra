import { api } from "@shared/api";

export interface ISkill {
  uid: string;
  name: string;
}

export const getSkillPool = ({ config }: TRequestConfig) =>
  api.get<ISkill[]>("/user/skill-pool", config);
