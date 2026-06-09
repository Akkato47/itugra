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
  [key: string]: unknown;
}
