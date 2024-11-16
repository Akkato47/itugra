import {
  pgTable,
  varchar,
  date,
  jsonb,
  foreignKey,
  boolean,
  unique,
  pgEnum,
  uuid,
} from 'drizzle-orm/pg-core';
import { baseSchema } from '../base.schema';
import { RoleEnum } from '@/db/drizzle/schema/user/enums/role.enum';
import { Via } from '@/db/drizzle/schema/user/enums/via.enum';
import { EduFormat } from '@/db/drizzle/schema/user/enums/education-format.enum';
import type { FilesCategory } from '@/db/drizzle/schema/user/enums/files-category.enum';
import { generateCode } from '@/lib/generate_code';
import type {
  FileType,
  ImageType,
} from '@/modules/uploads/types/file.interface';
import { skillPool } from '../testing/schema';

export const roleEnum = pgEnum('role_enum', ['USER', 'ORG', 'ADMIN', 'SU']);
export const viaEnum = pgEnum('via_enum', ['BASE', 'VK', 'YA', 'GOS', 'TG']);
export const fileEnum = pgEnum('file_enum', ['DIP', 'PORTFOLIO', 'RESUME']);
export const eduEnum = pgEnum('edu_enum', ['FULL', 'PART', 'DIST']);

export const users = pgTable(
  'users',
  {
    ...baseSchema,
    oAuthId: varchar('oauth_id', { length: 16 }).unique(),
    fullName: varchar('full_name', { length: 255 }).notNull(),
    tag: varchar('tag', { length: 12 })
      .$defaultFn(() => generateCode())
      .notNull(),
    mail: varchar('mail', { length: 255 }).notNull(),
    password: varchar('password', { length: 255 }),
    phone: varchar('phone', { length: 255 }).notNull(),
    role: roleEnum('role')
      .$type<RoleEnum>()
      .$default(() => RoleEnum.USER)
      .notNull(),
    birthDate: date('birth_date').notNull(),
    image: jsonb('image').$type<ImageType>(),
    backgroundImage: jsonb('background_image').$type<ImageType>(),
    via: viaEnum('via')
      .$type<Via>()
      .$default(() => Via.BASE)
      .notNull(),
    // profileInfoUid: varchar("profile_info_uid", { length: 255 }),
  },
  (table) => {
    return {
      // usersProfileInfoUidForeign: foreignKey({
      //     columns: [table.profileInfoUid],
      //     foreignColumns: [userProfleInfo.uid],
      //     name: "users_profile_info_uid_foreign",
      // }).onUpdate("cascade"),
      usersTagUnique: unique('users_tag_unique').on(table.tag),
      usersMailUnique: unique('users_mail_unique').on(table.mail),
      usersPhoneUnique: unique('users_phone_unique').on(table.phone),
      // usersProfileInfoUidUnique: unique(
      //     "users_profile_info_uid_unique",
      // ).on(table.profileInfoUid),
    };
  }
);

export type UserInferSelect = typeof users.$inferSelect;

export const userSkills = pgTable(
  'user_skills',
  {
    ...baseSchema,
    level: varchar('level', { length: 255 }).default('').notNull(),
    skillUid: uuid('skill_uid')
      .notNull()
      .references(() => skillPool.uid),
    profileInfoUid: uuid('profile_info_uid')
      .notNull()
      .references(() => userProfleInfo.uid),
  },
  (table) => {
    return {
      userSkillsProfileInfoUidForeign: foreignKey({
        columns: [table.profileInfoUid],
        foreignColumns: [userProfleInfo.uid],
        name: 'user_skills_profile_info_uid_foreign',
      }).onUpdate('cascade'),
    };
  }
);

export const userInterests = pgTable(
  'user_interests',
  {
    ...baseSchema,
    level: varchar('level', { length: 255 }).default('').notNull(),
    skillUid: uuid('skill_uid')
      .notNull()
      .references(() => skillPool.uid),
    profileInfoUid: uuid('profile_info_uid')
      .notNull()
      .references(() => userProfleInfo.uid),
  },
  (table) => {
    return {
      userInterestsProfileInfoUidForeign: foreignKey({
        columns: [table.profileInfoUid],
        foreignColumns: [userProfleInfo.uid],
        name: 'user_interests_profile_info_uid_foreign',
      }).onUpdate('cascade'),
    };
  }
);

export const userEducation = pgTable('user_education', {
  ...baseSchema,
  university: varchar('university', { length: 255 }).default('').notNull(),
  direction: varchar('direction', { length: 255 }).default('').notNull(),
  format: eduEnum('format')
    .$type<EduFormat>()
    .default(EduFormat.FULL)
    .notNull(),
  startDate: date('start_date'),
  endDate: date('end_date'),
  profileInfoUid: uuid('profile_info_uid').references(() => userProfleInfo.uid),
});

export const userProfleInfo = pgTable(
  'user_profle_info',
  {
    ...baseSchema,
    isSearchingJob: boolean('is_searching_job').default(false).notNull(),
    status: varchar('status', { length: 255 }).default('').notNull(),
    about: varchar('about', { length: 255 }).default('').notNull(),
    userUid: uuid('user_uid').references(() => users.uid),
    // userEducationUid: varchar("user_education_uid", { length: 255 }),
    // userLocationUid: varchar("user_location_uid", { length: 255 }),
  },
  (table) => {
    return {
      // userProfleInfoUserEducationUidForeign: foreignKey({
      //     columns: [table.userEducationUid],
      //     foreignColumns: [userEducation.uid],
      //     name: "user_profle_info_user_education_uid_foreign",
      // })
      //     .onUpdate("cascade")
      //     .onDelete("set null"),
      // userProfleInfoUserLocationUidForeign: foreignKey({
      //     columns: [table.userLocationUid],
      //     foreignColumns: [userLocation.uid],
      //     name: "user_profle_info_user_location_uid_foreign",
      // })
      //     .onUpdate("cascade")
      //     .onDelete("set null"),
      // userProfleInfoUserEducationUidUnique: unique(
      //     "user_profle_info_user_education_uid_unique",
      // ).on(table.userEducationUid),
      // userProfleInfoUserLocationUidUnique: unique(
      //     "user_profle_info_user_location_uid_unique",
      // ).on(table.userLocationUid),
    };
  }
);

export type ProfileInferInsert = typeof userProfleInfo.$inferInsert;

export const userLocation = pgTable('user_location', {
  ...baseSchema,
  country: varchar('country', { length: 255 }).default('').notNull(),
  region: varchar('region', { length: 255 }).default('').notNull(),
  city: varchar('city', { length: 255 }).default('').notNull(),
  profileInfoUid: uuid('profile_info_uid').references(() => userProfleInfo.uid),
});

// export const userInterests = pgTable(
//     "user_interests",
//     {
//         ...baseSchema,
//         name: varchar("name", { length: 255 }).default("").notNull(),
//         profileInfoUid: uuid("profile_info_uid")
//             .references(() => userProfleInfo.uid)
//             .notNull(),
//     },
//     (table) => {
//         return {
//             userInterestsProfileInfoUidForeign: foreignKey({
//                 columns: [table.profileInfoUid],
//                 foreignColumns: [userProfleInfo.uid],
//                 name: "user_interests_profile_info_uid_foreign",
//             }).onUpdate("cascade"),
//         };
//     },
// );

export const userFiles = pgTable(
  'user_files',
  {
    ...baseSchema,
    category: fileEnum('category').$type<FilesCategory>().notNull(),
    file: jsonb('file').$type<FileType>().notNull(),
    profileInfoUid: uuid('profile_info_uid')
      .references(() => userProfleInfo.uid)
      .notNull(),
  },
  (table) => {
    return {
      userFilesProfileInfoUidForeign: foreignKey({
        columns: [table.profileInfoUid],
        foreignColumns: [userProfleInfo.uid],
        name: 'user_files_profile_info_uid_foreign',
      }).onUpdate('cascade'),
    };
  }
);

export const userExperience = pgTable(
  'user_experience',
  {
    ...baseSchema,
    name: varchar('name', { length: 255 }).notNull(),
    position: varchar('position', { length: 255 }).notNull(),
    startDate: date('start_date').notNull(),
    endDate: date('end_date'),
    present: boolean('present').default(false).notNull(),
    profileInfoUid: uuid('profile_info_uid')
      .references(() => userProfleInfo.uid)
      .notNull(),
  },
  (table) => {
    return {
      userExperienceProfileInfoUidForeign: foreignKey({
        columns: [table.profileInfoUid],
        foreignColumns: [userProfleInfo.uid],
        name: 'user_experience_profile_info_uid_foreign',
      }).onUpdate('cascade'),
    };
  }
);

export type ExpInferInsert = typeof userExperience.$inferInsert;
