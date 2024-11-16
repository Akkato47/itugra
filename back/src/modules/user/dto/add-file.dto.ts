import type { FilesCategory } from '@/db/drizzle/schema/user/enums/files-category.enum';
import { FileType } from '@/modules/uploads/types/file.interface';

export class AddFileDto {
  file: FileType;
  category: FilesCategory;
}
