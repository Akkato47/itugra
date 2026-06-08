import type { IFriendshipStatus } from "@entities/friend/types";

import { api } from "@shared/api";

export type TGetFriendshipStatusConfig = TRequestConfig & {
  tag: string;
};

export const getFriendshipStatus = async ({ config, tag }: TGetFriendshipStatusConfig) =>
  api.get<IFriendshipStatus>(`/user/friend/status/${tag}`, config);
