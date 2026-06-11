import { api } from "@shared/api";

interface IRegisterSolo {
  eventUid: string;
}

export type TRegisterSoloConfig = TRequestConfig<IRegisterSolo>;

export const registerSolo = ({ params, config }: TRegisterSoloConfig) =>
  api.post(`/event/register/solo/${params.eventUid}`, undefined, config);
