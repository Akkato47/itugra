import {
  boolean,
  jsonb,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

import { baseSchema } from '../base.schema';
import { users } from '../user/schema';
import { NotificationType } from './enums/notification-type.enum';
import type { NotificationPayload } from './types/payload.type';

export const notificationTypeEnum = pgEnum('notification_type_enum', [
  'FRIEND_REQUEST',
  'FRIEND_ACCEPT',
  'SYSTEM',
]);

export const notifications = pgTable('notifications', {
  ...baseSchema,
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  userUid: uuid('user_uid')
    .notNull()
    .references(() => users.uid, { onDelete: 'cascade', onUpdate: 'cascade' }),
  type: notificationTypeEnum('type').$type<NotificationType>().notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  message: varchar('message', { length: 512 }).default('').notNull(),
  payload: jsonb('payload').$type<NotificationPayload>(),
  isRead: boolean('is_read').default(false).notNull(),
});

export type NotificationInferSelect = typeof notifications.$inferSelect;
export type NotificationInferInsert = typeof notifications.$inferInsert;
