import type { IParticipant } from "@entities/event/types";

import { api } from "@shared/api";

export type TGetParticipantsConfig = TRequestConfig & {
  eventUid: string;
};

export const getParticipants = async ({ config, eventUid }: TGetParticipantsConfig) =>
  api.get<IParticipant[]>(`/event/participants/${eventUid}`, config);
