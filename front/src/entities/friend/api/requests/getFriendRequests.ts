import type { IFriendRequests } from "@entities/friend/types";

import { api } from "@shared/api";

export const getFriendRequests = async ({ config }: TRequestConfig) =>
  api.get<IFriendRequests>(`/user/friend/requests`, config);
