import { api } from "@shared/api";

export const deleteSkill = ({ uid, config }: IUidConfig) =>
  api.delete(`/user/profile-skill/${uid}`, config);
