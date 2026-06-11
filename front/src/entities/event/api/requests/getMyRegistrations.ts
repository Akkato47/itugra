import type { IMyRegistration } from "@entities/event/types";

import { api } from "@shared/api";

export const getMyRegistrations = async ({ config }: TRequestConfig) =>
  api.get<IMyRegistration[]>(`/event/registrations/my`, config);
