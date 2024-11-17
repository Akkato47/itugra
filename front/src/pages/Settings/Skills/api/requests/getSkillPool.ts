import { api } from "@shared/api";

interface GetSkillPoolResponse {
  uid: string;
  name: string;
}

export const getSkillPool = ({ config }: TRequestConfig) =>
  api.get<GetSkillPoolResponse[]>("/user/skill-pool", config);
