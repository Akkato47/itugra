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

export const questionPool = pgTable('question_pool', {
  ...baseSchema,
  question: text('question').notNull(),
  answers: jsonb('answers').array().$type<TAnswer[]>().notNull(),
  skillUid: uuid('skill_uid')
    .notNull()
    .references(() => skillPool.uid),
});

export const categoryQuestions = pgTable('category_questions', {
  ...baseSchema,
  question: text('question').notNull(),
  answers: jsonb('answers').array().$type<TAnswer[]>().notNull(),
  categoryId: integer('category_id').notNull(),
});
