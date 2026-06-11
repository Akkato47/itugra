import { api } from "@shared/api";

interface IRemoveFriend {
  tag: string;
}

export type TRemoveFriendConfig = TRequestConfig<IRemoveFriend>;

export const removeFriend = ({ params, config }: TRemoveFriendConfig) =>
  api.delete(`/user/friend/${params.tag}`, config);
