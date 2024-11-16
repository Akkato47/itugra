import type { ETypeEventEnum } from "@entities/event/types";

export interface ICreateRequestDto {
  name: string;
  image: IImage;
  description: string;
  type: ETypeEventEnum;
  registrationEnd: string;
  end: string;
  categoryId: number[];
}
