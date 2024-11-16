import { ImageType } from '@/modules/uploads/types/file.interface';
import { date, jsonb, pgEnum, uuid, varchar } from 'drizzle-orm/pg-core';

export const eventEnum = pgEnum('event_enum', ['HACKATON', 'MEETUP']);

export const eventBaseSchema = {
  uid: uuid('uid').defaultRandom().primaryKey().notNull(),
  createdAt: date('created_at').defaultNow().notNull(),
  updatedAt: date('updated_at')
    .$onUpdate(() => new Date().toISOString())
    .notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  image: jsonb('image').$type<ImageType>(),
  description: varchar('description', { length: 255 }),
  type: eventEnum('type').notNull(),
};
