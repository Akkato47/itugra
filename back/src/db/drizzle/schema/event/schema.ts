import { boolean, jsonb, pgEnum, pgTable, uuid } from 'drizzle-orm/pg-core';
import { baseSchema } from '../base.schema';
import { eventBaseSchema } from './event-base.schema';
import { FileType } from '@/modules/uploads/types/file.interface';
import { users } from '../user/schema';

export const eventEnum = pgEnum('event_enum', ['HACKATON', 'MEETUP']);
export const statusEnum = pgEnum('status_enum', ['WAITING', 'CLOSED', 'END']);

export const eventRequest = pgTable('request', {
  ...eventBaseSchema,
  watched: boolean('watched').$default(() => false),
  approved: boolean('approved').$default(() => false),
});

export type InferInsertRequest = typeof eventRequest.$inferInsert;

export const event = pgTable('event', {
  ...eventBaseSchema,
});

export const eventDocs = pgTable('eventDocs', {
  ...baseSchema,
  document: jsonb('document').$type<FileType>().notNull(),
  private: boolean('private').$default(() => true),
  eventUid: uuid('event_uid').notNull(),
  eventRequestUid: uuid('event_uid')
    .notNull()
    .references(() => eventRequest.uid),
});

export const participants = pgTable('participants', {
  ...baseSchema,
  userUid: uuid('user_uid')
    .notNull()
    .references(() => users.uid),
  eventUid: uuid('event_uid')
    .notNull()
    .references(() => event.uid),
});
