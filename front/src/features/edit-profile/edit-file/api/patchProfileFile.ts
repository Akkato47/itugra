import { api } from "@shared/api";

interface IProfileFileRequest {
  fileUid: string;
  name: string;
}

export type IPatchProfileFileConfig = TRequestConfig<IProfileFileRequest>;

export const patchProfileFile = ({ params, config }: IPatchProfileFileConfig) =>
  api.patch("/user/profile-doc", params, config);
