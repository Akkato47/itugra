import { api } from "@shared/api";

interface IEventAction {
  eventUid: string;
}

export type TEventActionConfig = TRequestConfig<IEventAction>;

export const closeEvent = ({ params, config }: TEventActionConfig) =>
  api.patch(`/admin/events/${params.eventUid}/close`, undefined, config);

export const deleteEvent = ({ params, config }: TEventActionConfig) =>
  api.delete(`/admin/events/${params.eventUid}`, config);
