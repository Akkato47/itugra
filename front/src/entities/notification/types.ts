export type TNotificationType =
  | "FRIEND_REQUEST"
  | "FRIEND_ACCEPT"
  | "SYSTEM"
  | "TEAM_INVITE"
  | "EVENT";

export interface INotificationPayload {
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
}

export interface INotification {
  uid: string;
  createdAt: string;
  updatedAt: string;
  userUid: string;
  type: TNotificationType;
  title: string;
  message: string;
  payload: INotificationPayload | null;
  isRead: boolean;
}
