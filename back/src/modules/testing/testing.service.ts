import { db } from '@/db/drizzle/connect';
import { GenerateTestDto } from './dto/generate-test.dto';
import {
  skillPool,
} from '@/db/drizzle/schema/testing/schema';
import { eq } from 'drizzle-orm';
import { userProfleInfo, userSkills } from '@/db/drizzle/schema/user/schema';
import { createGigaChatClient, extractJson } from '@/lib/gigachat';
import config from '@/config';
import { CustomError } from '@/utils/custom_error';
import { HttpStatus } from '@/utils/enums/http-status';
import { logger } from '@/lib/loger';

interface IAnswer {question: string, type: string, answers: Array<string>}

export const generateTest = async (userUid: string, dto: GenerateTestDto) => {
  try {
    const profileInfo = await db
        .select()
        .from(userProfleInfo)
        .where(eq(userProfleInfo.userUid, userUid))

    const skills = await db
      .select({
        skillUid: userSkills.skillUid,
        level: userSkills.level,
        name: skillPool.name
      })
      .from(userSkills)
      .where(eq(userSkills.profileInfoUid, profileInfo[0].uid))
      .leftJoin(skillPool, eq(skillPool.uid, userSkills.skillUid));

    if (skills.length === 0) {
      throw new CustomError(
        HttpStatus.BAD_REQUEST,
        'Пользователь не имеет навыков для проверки'
      );
    }

    const gigachat = createGigaChatClient()

    const skillNames = skills
      .map((skill) => skill.name)
      .filter((name): name is string => Boolean(name));
    const minQuestions = skillNames.length * 3;

    const systemPrompt = [
      'Ты — опытный специалист по проведению собеседования для IT-специалистов.',
      'Тебе дают пронумерованный список навыков пользователя.',
      'Для КАЖДОГО навыка из списка составь от 3 до 5 вопросов.',
      'НЕ пропускай ни один навык — покрой все навыки равномерно.',
      'Есть 2 типа вопроса: "open" — нужно ответить самому, "closed" — с выбором варианта.',
      'Для "closed" давай от 4 до 8 вариантов ответа.',
      '',
      'Формат ответа — СТРОГО валидный JSON-массив объектов вида:',
      '[{"question":"Текст вопроса","type":"open или closed","answers":["вариант 1","вариант 2"]}]',
      '',
      'Жёсткие требования к ответу:',
      '- Верни ТОЛЬКО JSON-массив. Без markdown, без ```json, без пояснений и текста до или после.',
      '- Каждый объект содержит строковые поля "question", "type", "answers".',
      '- Всегда должен быть правильный ответ и/или максимально приближенный к нему.',
      '- Не отдавай ответы, которые могут ввести в заблуждение или являются спорными.',
      '- Учитывай выбранную категорию человека.',
      '- Если вопрос типа "open", то верни пустой массив в "answers".',
      '- Все вопросы и ответы на русском языке.',
    ].join('\n');

    const userPrompt = [
      `Навыки пользователя (${skillNames.length} шт.), составь вопросы по каждому:`,
      skillNames.map((name, index) => `${index + 1}. ${name}`).join('\n'),
      '',
      `Выбранная категория: ${dto.category}`,
      `Сгенерируй не менее ${minQuestions} вопросов, охватывающих ВСЕ навыки из списка.`,
    ].join('\n');

    await gigachat.createToken()
    const response = await gigachat.completion({
      model: config.gigachat.model,
      temperature: 0.3,
      max_tokens: 4096,
      messages: [
        {role: 'system', content: systemPrompt},
        {role: 'user', content: userPrompt}
      ]
    })

    const rawContent = response.choices[0]?.message?.content;
    logger.info(
      `[generateTest] skills=${skillNames.length} minExpected=${minQuestions} ` +
        `finish=${response.choices[0]?.finish_reason} usage=${JSON.stringify(response.usage)}`
    );
    logger.info(`[generateTest] raw model response: ${rawContent}`);

    const data = extractJson<Array<IAnswer>>(rawContent)

    const items = (Array.isArray(data) ? data : [])
      .map((item) => {
        return {
          question: `${item?.question ?? ''}`.trim(),
          type: `${item?.type ?? ''}`.trim(),
          answers: Array.isArray(item?.answers)
            ? item.answers
                .map((ans) => `${ans ?? ''}`.trim())
                .filter((ans) => ans.length > 0)
            : []
        } as IAnswer
      })
      .filter((item) => item.question.length > 0)

    logger.info(`[generateTest] parsed ${items.length} questions`);

    if (items.length === 0) {
      throw new CustomError(
        HttpStatus.BAD_GATEWAY,
        'Модель вернула пустой ответ, попробуйте ещё раз'
      );
    }

    let skillQuestions: {
      questionBody: string;
      answers: { body: string }[];
    }[] = [];
    for (const item of items) {
      skillQuestions.push({
        questionBody: item.question,
        answers: item.answers.map((body) => ({ body })),
      });
    }
    return skillQuestions
  } catch (error) {
    throw error;
  }
};
