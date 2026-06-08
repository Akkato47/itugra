import { api } from "@shared/api";

interface IMarkRead {
  uid: string;
}

export type TMarkReadConfig = TRequestConfig<IMarkRead>;

export const markRead = ({ params, config }: TMarkReadConfig) =>
  api.patch(`/notification/${params.uid}/read`, undefined, config);
