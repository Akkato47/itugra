import type { ITeamInvite } from "@entities/team/types";

import { api } from "@shared/api";

export const getInvites = ({ config }: TRequestConfig) =>
  api.get<ITeamInvite[]>("/team/invite/list", config);
