import { api } from "@shared/api";

interface ISendFriendRequest {
  tag: string;
}

export type TSendFriendRequestConfig = TRequestConfig<ISendFriendRequest>;

export const sendFriendRequest = ({ params, config }: TSendFriendRequestConfig) =>
  api.post(`/user/friend/request/${params.tag}`, undefined, config);
