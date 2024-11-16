import { ImageType } from '@/modules/uploads/types/file.interface';
import {
  boolean,
  date,
  integer,
  jsonb,
  pgEnum,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { EventEnum } from './enums/event-types.enum';
import { users } from '../user/schema';
import { StatusEnum } from './enums/status.enum';

export const eventEnum = pgEnum('event_enum', ['HACKATON', 'MEETUP']);
export const statusEnum = pgEnum('status_enum', ['WAITING', 'CLOSED', 'END']);

export const eventBaseSchema = {
  uid: uuid('uid').defaultRandom().primaryKey().notNull(),
  createdAt: date('created_at').defaultNow().notNull(),
  updatedAt: date('updated_at')
    .$onUpdate(() => new Date().toISOString())
    .notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  image: jsonb('image').$type<ImageType>(),
  description: varchar('description', { length: 255 }),
  type: eventEnum('type').$type<EventEnum>().notNull(),
  status: statusEnum('status')
    .$type<StatusEnum>()
    .notNull()
    .$default(() => StatusEnum.WAITING),
  registrationEnd: date('registration_end').notNull(),
  end: date('end').notNull(),
  categoryId: integer('category_id').array(),
  userUid: uuid('userUid')
    .notNull()
    .references(() => users.uid),
};
