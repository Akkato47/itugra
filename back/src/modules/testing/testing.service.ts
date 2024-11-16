import { db } from '@/db/drizzle/connect';
import { GenerateTestDto } from './dto/generate-test.dto';
import {
  categoryQuestions,
  questionPool,
  skillPool,
} from '@/db/drizzle/schema/testing/schema';
import { eq } from 'drizzle-orm';
import { userProfleInfo, userSkills } from '@/db/drizzle/schema/user/schema';

export const getSkillsList = async () => {
  try {
    return await db
      .select({
        uid: skillPool.uid,
        name: skillPool.name,
      })
      .from(skillPool);
  } catch (error) {
    throw error;
  }
};

export const generateTest = async (userUid: string, dto: GenerateTestDto) => {
  try {
    const profileInfo = await db
      .select()
      .from(userProfleInfo)
      .where(eq(userProfleInfo.userUid, userUid));
    const categoryQuestionList = await db
      .select()
      .from(categoryQuestions)
      .where(eq(categoryQuestions.categoryId, dto.category));

    const skillQuestions = [];
    for (const skillUid of dto.skillsUid) {
      const question = await db
        .select({
          questionBody: questionPool.question,
          answers: questionPool.answers,
        })
        .from(questionPool)
        .where(eq(questionPool.skillUid, skillUid));
      skillQuestions.push(question);

      await db.insert(userSkills).values({
        profileInfoUid: profileInfo[0].uid,
        skillUid,
      });
    }

    return {
      ...categoryQuestionList,
      ...skillQuestions,
    };
  } catch (error) {
    throw error;
  }
};
