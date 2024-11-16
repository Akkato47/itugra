import {
  boolean,
  foreignKey,
  pgEnum,
  pgTable,
  text,
  uuid,
  varchar,
  jsonb,
} from 'drizzle-orm/pg-core';
import { users } from '../user/schema';
import type { Abilities } from '@/db/drizzle/schema/team/enum/ability.enum';
import { baseSchema } from '../base.schema';
import type { TeamTypes } from '@/db/drizzle/schema/team/enum/team-type.enum';
import { ImageType } from '@/modules/uploads/types/file.interface';

export const teamEnum = pgEnum('team_enum', ['TEMP', 'PERMANENT', 'BANNED']);
export const abilityEnum = pgEnum('ability_enum', [
  'ALL',
  'EDIT',
  'POST',
  'INVITE',
  'DELETE',
  'EVENTREG',
  'NOTHING',
]);

export const team = pgTable('team', {
  ...baseSchema,
  name: varchar('name', { length: 255 }).notNull(),
  about: text('about'),
  image: jsonb('image').$type<ImageType>(),
  type: teamEnum('type').$type<TeamTypes>().notNull(),
});

export type TeamInferSelect = typeof team.$inferSelect;

export const customTeamRole = pgTable(
  'custom_team_role',
  {
    ...baseSchema,
    name: varchar('name', { length: 255 }).notNull(),
    abilities: abilityEnum('abilities').$type<Abilities>().array().notNull(),
    color: varchar('color', { length: 255 }).notNull(),
    teamUid: uuid('team_uid')
      .notNull()
      .references(() => team.uid),
  },
  (table) => {
    return {
      customTeamRoleTeamUidForeign: foreignKey({
        columns: [table.teamUid],
        foreignColumns: [team.uid],
        name: 'custom_team_role_team_uid_foreign',
      })
        .onUpdate('cascade')
        .onDelete('cascade'),
    };
  }
);

export const userTeamRole = pgTable(
  'user_team_role',
  {
    ...baseSchema,
    userUid: uuid('user_uid')
      .notNull()
      .references(() => users.uid),
    teamUid: uuid('team_uid')
      .notNull()
      .references(() => team.uid),
    ctrUid: uuid('ctr_uid')
      .notNull()
      .references(() => customTeamRole.uid),
  },
  (table) => {
    return {
      utrUserUidForeign: foreignKey({
        columns: [table.userUid],
        foreignColumns: [users.uid],
        name: 'UTR_user_uid_foreign',
      }).onUpdate('cascade'),
      utrTeamUidForeign: foreignKey({
        columns: [table.teamUid],
        foreignColumns: [team.uid],
        name: 'UTR_team_uid_foreign',
      })
        .onUpdate('cascade')
        .onDelete('cascade'),
      utrRoleUidForeign: foreignKey({
        columns: [table.ctrUid],
        foreignColumns: [customTeamRole.uid],
        name: 'UTR_role_uid_foreign',
      }).onUpdate('cascade'),
    };
  }
);
