export enum ETypeEventEnum {
  HACKATON = "HACKATON",
  MEETUP = "MEETUP"
}

export enum EEventStatus {
  WAITING = "WAITING",
  CLOSED = "CLOSED",
  END = "END"
}

export enum EModerationStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED"
}

export enum ERegistrationKind {
  SOLO = "SOLO",
  TEAM = "TEAM"
}

export interface IEvent {
  uid: string;
  name: string;
  type: ETypeEventEnum;
  status: EEventStatus;
  image: IImage | null;
  userName: string | null;
  description: string | null;
  registrationEnd: string;
  end: string;
  categoryId: number[] | null;
}

export interface IMyRegistration {
  registrationUid: string;
  kind: ERegistrationKind;
  teamUid: string | null;
  teamName: string | null;
  eventUid: string;
  eventName: string;
  eventStatus: EEventStatus;
  registrationEnd: string;
  end: string;
}

export interface IParticipant {
  registrationUid: string;
  kind: ERegistrationKind;
  userUid: string;
  userName: string | null;
  userTag: string | null;
  teamUid: string | null;
  teamName: string | null;
}

export interface IMyRequest {
  uid: string;
  name: string;
  type: ETypeEventEnum;
  description: string | null;
  image: IImage | null;
  moderationStatus: EModerationStatus;
  moderationReason: string | null;
  registrationEnd: string;
  end: string;
  categoryId: number[] | null;
}
