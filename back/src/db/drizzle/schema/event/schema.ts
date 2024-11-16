import type { ImageType } from 'aws-sdk/clients/batch';
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

export const event = pgTable('event', {
  ...baseSchema,
  name: varchar('name', { length: 255 }).notNull(),
  image: jsonb('image').$type<ImageType>(),
  description: varchar('description', { length: 255 }).notNull(),
  documents: jsonb('documents').$type<FileType[]>().array(),
  type: eventEnum('type').notNull(),
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
