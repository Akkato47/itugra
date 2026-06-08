import { api } from "@shared/api";

interface IAcceptFriendRequest {
  requestUid: string;
}

export type TAcceptFriendRequestConfig = TRequestConfig<IAcceptFriendRequest>;

export const acceptFriendRequest = ({ params, config }: TAcceptFriendRequestConfig) =>
  api.post(`/user/friend/accept/${params.requestUid}`, undefined, config);
