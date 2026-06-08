import type { IFriend } from "@entities/friend/types";

import { api } from "@shared/api";

export type TGetFriendsConfig = TRequestConfig & {
  tag: string;
};

export const getFriends = async ({ config, tag }: TGetFriendsConfig) =>
  api.get<IFriend[]>(`/user/friends/${tag}`, config);
