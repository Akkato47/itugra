export interface IFriend {
  uid: string;
  fullName: string;
  tag: string;
  image: IImage | null;
  role: string;
}

export interface IFriendRequest extends IFriend {
  requestUid: string;
  createdAt: string;
}

export interface IFriendRequests {
  incoming: IFriendRequest[];
  outgoing: IFriendRequest[];
}

export type TFriendshipStatus = "SELF" | "NONE" | "FRIENDS" | "INCOMING" | "OUTGOING";

export interface IFriendshipStatus {
  status: TFriendshipStatus;
  requestUid: string | null;
}
