export interface IDecodedToken {
  uid: string;
  role: string;
  tag: string;
  iat: number;
  exp: number;
  subject: string;
}

export interface IDecodedInviteToken {
  ctrUid: string;
  userTag: string;
  teamUid: string;
  iat: number;
  exp: number;
  subject: string;
}
