export interface NotificationPayload {
  actorUid?: string;
  actorTag?: string;
  actorName?: string;
  actorImage?: string | null;
  requestUid?: string;
  inviteUid?: string;
  teamUid?: string;
  teamName?: string;
  roleName?: string;
  eventUid?: string;
  eventName?: string;
  [key: string]: unknown;
}
