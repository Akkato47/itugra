export interface NotificationPayload {
  actorUid?: string;
  actorTag?: string;
  actorName?: string;
  actorImage?: string | null;
  requestUid?: string;
  [key: string]: unknown;
}
