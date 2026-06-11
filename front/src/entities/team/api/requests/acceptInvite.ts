import { api } from "@shared/api";

interface IAcceptInvite {
  inviteUid: string;
}

export type TAcceptInviteConfig = TRequestConfig<IAcceptInvite>;

export const acceptInvite = ({ params, config }: TAcceptInviteConfig) =>
  api.post(`/team/invite/accept/${params.inviteUid}`, undefined, config);
