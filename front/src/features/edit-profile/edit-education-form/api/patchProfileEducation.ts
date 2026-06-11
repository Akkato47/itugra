import { api } from "@shared/api";

interface IUpdateEducationRequest {
  university: string;
  direction: string;
  format: string;
  startDate: string;
  endDate: string;
}

export type IPatchProfileEducationConfig = TRequestConfig<IUpdateEducationRequest>;

export const patchProfileEducation = ({ params, config }: IPatchProfileEducationConfig) =>
  api.patch("/user/profile-edu", params, config);
