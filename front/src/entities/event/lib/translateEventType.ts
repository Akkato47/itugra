import { ETypeEventEnum } from "../types";

export const translateEvenType = (eventType: ETypeEventEnum) => {
  switch (eventType) {
    case ETypeEventEnum.HACKATON:
      return "Хакатон";
    case ETypeEventEnum.MEETUP:
      return "Конференция";
  }
};
