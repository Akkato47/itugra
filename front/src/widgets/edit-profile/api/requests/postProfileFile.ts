import { api } from "@shared/api";

interface ICreateProfileFile {
  category: string;
  file: TFile;
}

export type TPostProfileFileConfig = TRequestConfig<ICreateProfileFile>;

export const postProfileFile = ({ params, config }: TPostProfileFileConfig) =>
  api.post("/user/profile-file", params, config);
