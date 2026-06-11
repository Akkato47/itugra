import { api } from "@shared/api";

interface IDeclineInvite {
  inviteUid: string;
}

export type TDeclineInviteConfig = TRequestConfig<IDeclineInvite>;

export const declineInvite = ({ params, config }: TDeclineInviteConfig) =>
  api.post(`/team/invite/decline/${params.inviteUid}`, undefined, config);
