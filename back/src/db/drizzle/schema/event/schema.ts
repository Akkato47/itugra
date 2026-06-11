import { boolean, jsonb, pgTable, unique, uuid, varchar } from 'drizzle-orm/pg-core';
import { baseSchema } from '../base.schema';
import {
  eventBaseSchema,
  moderationStatusEnum,
  registrationKindEnum,
  registrationStatusEnum,
} from './event-base.schema';
import { FileType } from '@/modules/uploads/types/file.interface';
import { users } from '../user/schema';
import { team } from '../team/schema';
import { ModerationStatus } from './enums/moderation-status.enum';
import { RegistrationKind } from './enums/registration.enum';
import { RegistrationStatus } from './enums/registration.enum';

export {
  eventEnum,
  statusEnum,
  moderationStatusEnum,
  registrationKindEnum,
  registrationStatusEnum,
} from './event-base.schema';

export const eventRequest = pgTable('request', {
  ...eventBaseSchema,
  watched: boolean('watched').$default(() => false),
  approved: boolean('approved').$default(() => false),
  moderationStatus: moderationStatusEnum('moderation_status')
    .$type<ModerationStatus>()
    .notNull()
    .default(ModerationStatus.PENDING),
  moderationReason: varchar('moderation_reason', { length: 1000 }),
});

export type InferInsertRequest = typeof eventRequest.$inferInsert;
export type EventRequestInferSelect = typeof eventRequest.$inferSelect;

export const event = pgTable('event', {
  ...eventBaseSchema,
  requestUid: uuid('request_uid').references(() => eventRequest.uid, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
});

export type EventInferSelect = typeof event.$inferSelect;

export const eventDocs = pgTable('eventDocs', {
  ...baseSchema,
  document: jsonb('document').$type<FileType>().notNull(),
  private: boolean('private').$default(() => true),
  eventUid: uuid('event_uid').references(() => event.uid),
  eventRequestUid: uuid('event_request_uid').references(() => eventRequest.uid),
});

export const eventRegistration = pgTable(
  'event_registration',
  {
    ...baseSchema,
    eventUid: uuid('event_uid')
      .notNull()
      .references(() => event.uid, { onDelete: 'cascade', onUpdate: 'cascade' }),
    userUid: uuid('user_uid')
      .notNull()
      .references(() => users.uid, { onDelete: 'cascade', onUpdate: 'cascade' }),
    teamUid: uuid('team_uid').references(() => team.uid, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    kind: registrationKindEnum('kind')
      .$type<RegistrationKind>()
      .notNull()
      .default(RegistrationKind.SOLO),
    status: registrationStatusEnum('status')
      .$type<RegistrationStatus>()
      .notNull()
      .default(RegistrationStatus.REGISTERED),
  },
  (table) => {
    return {
      eventRegistrationUserUnique: unique('event_registration_user_unique').on(
        table.eventUid,
        table.userUid
      ),
      eventRegistrationTeamUnique: unique('event_registration_team_unique').on(
        table.eventUid,
        table.teamUid
      ),
    };
  }
);

export type EventRegistrationInferSelect = typeof eventRegistration.$inferSelect;

export const participants = pgTable('participants', {
  ...baseSchema,
  userUid: uuid('user_uid')
    .notNull()
    .references(() => users.uid),
  eventUid: uuid('event_uid')
    .notNull()
    .references(() => event.uid),
});
