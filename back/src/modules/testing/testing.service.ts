import { db } from '@/db/drizzle/connect';
import { GenerateTestDto } from './dto/generate-test.dto';
import {
  categoryQuestions,
  questionPool,
  skillPool,
} from '@/db/drizzle/schema/testing/schema';
import { eq, inArray } from 'drizzle-orm';
import { userProfleInfo, userSkills } from '@/db/drizzle/schema/user/schema';

export const generateTest = async (userUid: string, dto: GenerateTestDto) => {
  try {
    // profileInfo и вопросы по категории независимы — берём параллельно.
    const [profileInfo, categoryQuestionList] = await Promise.all([
      db
        .select()
        .from(userProfleInfo)
        .where(eq(userProfleInfo.userUid, userUid)),
      db
        .select({
          questionBody: categoryQuestions.question,
          answers: categoryQuestions.answers,
        })
        .from(categoryQuestions)
        .where(eq(categoryQuestions.categoryId, dto.category)),
    ]);

    const skills = await db
      .select()
      .from(userSkills)
      .where(eq(userSkills.profileInfoUid, profileInfo[0].uid));

    const skillUids = skills.map((skill) => skill.skillUid);

    let skillQuestions: { questionBody: string; answers: unknown }[] = [];
    if (skillUids.length > 0) {
      const questions = await db
        .select({
          skillUid: questionPool.skillUid,
          questionBody: questionPool.question,
          answers: questionPool.answers,
        })
        .from(questionPool)
        .where(inArray(questionPool.skillUid, skillUids));

      // По одному вопросу на навык, в порядке навыков пользователя.
      const questionBySkill = new Map<string, { questionBody: string; answers: unknown }>();
      for (const question of questions) {
        if (!questionBySkill.has(question.skillUid)) {
          questionBySkill.set(question.skillUid, {
            questionBody: question.questionBody,
            answers: question.answers,
          });
        }
      }

      skillQuestions = skillUids
        .map((uid) => questionBySkill.get(uid))
        .filter((q): q is { questionBody: string; answers: unknown } => Boolean(q));
    }

    return [...categoryQuestionList, ...skillQuestions];
  } catch (error) {
    throw error;
  }
};
