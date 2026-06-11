import { api } from "@shared/api";

export const deleteExperience = ({ uid, config }: IUidConfig) =>
  api.delete(`/user/profile-experience/${uid}`, config);
