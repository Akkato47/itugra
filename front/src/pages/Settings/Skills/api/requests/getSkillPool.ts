import { api } from "@shared/api";

interface GetSkillPoolResponse {
  uid: string;
  name: string;
}

export const getSkillPool = ({ config, search }: TRequestConfig & { search?: string }) =>
  api.get<GetSkillPoolResponse[]>("/user/skill-pool", { ...config, params: { search } });
