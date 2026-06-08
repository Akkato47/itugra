import { api } from "@shared/api";

interface IDeclineFriendRequest {
  requestUid: string;
}

export type TDeclineFriendRequestConfig = TRequestConfig<IDeclineFriendRequest>;

export const declineFriendRequest = ({ params, config }: TDeclineFriendRequestConfig) =>
  api.post(`/user/friend/decline/${params.requestUid}`, undefined, config);
