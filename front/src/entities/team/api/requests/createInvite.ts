import { api } from "@shared/api";

interface ICreateInvite {
  userTag: string;
  teamUid: string;
  ctrUid: string;
}

export type TCreateInviteConfig = TRequestConfig<ICreateInvite>;

export const createInvite = ({ params, config }: TCreateInviteConfig) =>
  api.post("/team/invite/create", params, config);
