import { api } from "@shared/api";

interface ICancelRegistration {
  registrationUid: string;
}

export type TCancelRegistrationConfig = TRequestConfig<ICancelRegistration>;

export const cancelRegistration = ({ params, config }: TCancelRegistrationConfig) =>
  api.post(`/event/register/cancel/${params.registrationUid}`, undefined, config);
