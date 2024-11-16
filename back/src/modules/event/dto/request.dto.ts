import { EventEnum } from '@/db/drizzle/schema/event/enums/event-types.enum';
import { InferInsertRequest } from '@/db/drizzle/schema/event/schema';
import { ImageType } from '@/modules/uploads/types/file.interface';

export class CreateRequestDto implements Partial<InferInsertRequest> {
  name: string;
  image: ImageType;
  description: string;
  type: EventEnum;
  registrationEnd: string;
  end: string;
  categosryId: number[];
}

export class MakeDecisions {
  requestUid: string;
  decision: boolean;
}
