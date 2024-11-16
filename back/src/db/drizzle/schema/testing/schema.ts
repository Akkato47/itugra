import {
  integer,
  jsonb,
  pgTable,
  text,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { baseSchema } from '../base.schema';
import { TAnswer } from './types/answer.type';

export const skillPool = pgTable('skill_pool', {
  ...baseSchema,
  name: varchar('name', { length: 255 }).notNull(),
});

export type InferInsertSkillPool = typeof skillPool.$inferInsert;

export const questionPool = pgTable('question_pool', {
  ...baseSchema,
  question: text('question').notNull(),
  answers: jsonb('answers').array().$type<TAnswer[]>().notNull(),
  skillUid: uuid('skill_uid')
    .notNull()
    .references(() => skillPool.uid),
});

export type InferInsertQuestionPool = typeof questionPool.$inferInsert;

export const categoryQuestions = pgTable('category_questions', {
  ...baseSchema,
  question: text('question').notNull(),
  answers: jsonb('answers').array().$type<TAnswer[]>().notNull(),
  categoryId: integer('category_id').notNull(),
});

export type InferInsertCategoryQuestionPool =
  typeof categoryQuestions.$inferInsert;

// export const roadmap = pgTable("roadmap", {
//   ...baseSchema,
// })
// const g = {
//   testResult: [
//     {
//       question: 'text',
//       answer: 'text',
//     },
//   ],
//   interestedIn: [
//     {
//       uid: 'skill uid',
//       name: 'skill namee',
//     },
//   ],
// };
