import { relations } from 'drizzle-orm/relations';
import {
  userEducation,
  userProfleInfo,
  userLocation,
  userFiles,
  userExperience,
  users,
  userSkills,
  userInterests,
} from './schema';
import { userTeamRole } from '../team/schema';
import { skillPool } from '../testing/schema';

export const userRelations = relations(users, ({ one, many }) => ({
  userProfleInfo: one(userProfleInfo, {
    fields: [users.uid],
    references: [userProfleInfo.userUid],
  }),
  utrs: many(userTeamRole),
}));

export const userProfleInfoRelations = relations(
  userProfleInfo,
  ({ one, many }) => ({
    userEducation: one(userEducation, {
      fields: [userProfleInfo.uid],
      references: [userEducation.profileInfoUid],
    }),
    userLocation: one(userLocation, {
      fields: [userProfleInfo.uid],
      references: [userLocation.profileInfoUid],
    }),
    // userInterests: many(userInterests),
    userFiles: many(userFiles),
    userExperiences: many(userExperience),
    userSkills: many(userSkills),
  })
);

export const userInterestsRelations = relations(userInterests, ({ one }) => ({
  userProfleInfo: one(userProfleInfo, {
    fields: [userInterests.profileInfoUid],
    references: [userProfleInfo.uid],
  }),
  skillPools: one(skillPool, {
    fields: [userInterests.skillUid],
    references: [skillPool.uid],
  }),
}));

export const userSkillsRelations = relations(userSkills, ({ one }) => ({
  userProfleInfo: one(userProfleInfo, {
    fields: [userSkills.profileInfoUid],
    references: [userProfleInfo.uid],
  }),
  skillPools: one(skillPool, {
    fields: [userSkills.skillUid],
    references: [skillPool.uid],
  }),
}));

export const userFilesRelations = relations(userFiles, ({ one }) => ({
  userProfleInfo: one(userProfleInfo, {
    fields: [userFiles.profileInfoUid],
    references: [userProfleInfo.uid],
  }),
}));

export const userExperienceRelations = relations(userExperience, ({ one }) => ({
  userProfleInfo: one(userProfleInfo, {
    fields: [userExperience.profileInfoUid],
    references: [userProfleInfo.uid],
  }),
}));
