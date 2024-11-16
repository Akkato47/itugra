import { relations } from 'drizzle-orm';
import { questionPool, skillPool } from './schema';
import { userInterests, userSkills } from '../user/schema';

export const skillPollRelation = relations(skillPool, ({ many }) => ({
  question: many(skillPool),
  userSkill: many(userSkills),
  userInterest: many(userInterests),
}));

export const questionPoolRelation = relations(questionPool, ({ one }) => ({
  skill: one(skillPool, {
    fields: [questionPool.skillUid],
    references: [skillPool.uid],
  }),
}));
