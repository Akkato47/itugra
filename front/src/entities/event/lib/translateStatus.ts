import { EEventStatus, EModerationStatus } from "../types";

export const translateModerationStatus = (status: EModerationStatus) => {
  switch (status) {
    case EModerationStatus.PENDING:
      return "На модерации";
    case EModerationStatus.APPROVED:
      return "Одобрено";
    case EModerationStatus.REJECTED:
      return "Отклонено";
  }
};

export const moderationStatusColor = (status: EModerationStatus) => {
  switch (status) {
    case EModerationStatus.PENDING:
      return "bg-amber-500";
    case EModerationStatus.APPROVED:
      return "bg-green-600";
    case EModerationStatus.REJECTED:
      return "bg-red-600";
  }
};

export const translateEventStatus = (status: EEventStatus) => {
  switch (status) {
    case EEventStatus.WAITING:
      return "Регистрация открыта";
    case EEventStatus.CLOSED:
      return "Регистрация закрыта";
    case EEventStatus.END:
      return "Завершено";
  }
};
