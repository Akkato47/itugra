import { api } from "@shared/api";

interface ICreateEvent {
  name: string;
  image: IImage;
  type: string;
  description: string;
  registrationEnd: string;
  end: string;
  categoryId: number[];
}

export type TPostCreateEventConfig = TRequestConfig<ICreateEvent>;

export const postCreateEvent = ({ params, config }: TPostCreateEventConfig) =>
  api.post("/event/create/request", params, config);
