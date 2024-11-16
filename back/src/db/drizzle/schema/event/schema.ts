import {
  boolean,
  jsonb,
  pgEnum,
  pgTable,
  text,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { baseSchema } from '../base.schema';
import { eventBaseSchema } from './event-base.schema';
import { FileType } from '@/modules/uploads/types/file.interface';

export const eventEnum = pgEnum('event_enum', ['HACKATON', 'MEETUP']);

export const request = pgTable('request', {
  ...eventBaseSchema,
  approved: boolean('approved')
    .notNull()
    .$default(() => false),
});

export const hackaton = pgTable('hackaton', {
  ...eventBaseSchema,
});

export const eventDocs = pgTable('eventDocs', {
  ...baseSchema,
  document: jsonb('document').$type<FileType>().notNull(),
  private: boolean('private').$default(() => true),
  eventUid: uuid('event_uid').notNull(),
});
