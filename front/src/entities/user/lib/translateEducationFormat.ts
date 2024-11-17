import { EEducationFormat } from "../types/userInfo";

export const translateEducationFormat = (educationFormat: EEducationFormat) => {
  switch (educationFormat) {
    case EEducationFormat.DIST:
      return "Дистанционная";
    case EEducationFormat.FULL:
      return "Очная";
    case EEducationFormat.PART:
      return "Заочная";
  }
};
