import { api } from "@shared/api";

export const deleteProfileFile = ({ uid, config }: IUidConfig) =>
  api.delete(`/user/profile-file/${uid}`, config);
