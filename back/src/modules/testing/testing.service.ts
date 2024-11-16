import { db } from '@/db/drizzle/connect';
import { GenerateTestDto } from './dto/generate-test.dto';
import {
  categoryQuestions,
  questionPool,
  skillPool,
} from '@/db/drizzle/schema/testing/schema';
import { eq } from 'drizzle-orm';
import { userProfleInfo, userSkills } from '@/db/drizzle/schema/user/schema';

export const generateTest = async (userUid: string, dto: GenerateTestDto) => {
  try {
    const profileInfo = await db
      .select()
      .from(userProfleInfo)
      .where(eq(userProfleInfo.userUid, userUid));
    const categoryQuestionList = await db
      .select({
        questionBody: categoryQuestions.question,
        answers: categoryQuestions.answers,
      })
      .from(categoryQuestions)
      .where(eq(categoryQuestions.categoryId, dto.category));

    const skillQuestions = [];
    const skills = await db
      .select()
      .from(userSkills)
      .where(eq(userSkills.profileInfoUid, profileInfo[0].uid));
    for (const skill of skills) {
      const question = await db
        .select({
          questionBody: questionPool.question,
          answers: questionPool.answers,
        })
        .from(questionPool)
        .where(eq(questionPool.skillUid, skill.skillUid));
      skillQuestions.push(question[0]);
    }

    return [...categoryQuestionList, ...skillQuestions];
  } catch (error) {
    throw error;
  }
};
