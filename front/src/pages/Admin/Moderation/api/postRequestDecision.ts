import { api } from "@shared/api";

export type TPostRequestDecisionConfig = TRequestConfig<{
  requestUid: string;
  decision: boolean;
}>;

export const postRequestDecision = ({ params, config }: TPostRequestDecisionConfig) =>
  api.post(`/event/make/desicion`, params, config);
