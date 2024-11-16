import config from '../../config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import {
  categoryQuestions,
  InferInsertCategoryQuestionPool,
  InferInsertQuestionPool,
  InferInsertSkillPool,
  questionPool,
  skillPool,
} from './schema/testing/schema';
import { v4 } from 'uuid';
import dataFromFile from './data.json';

const seed = async () => {
  const seedClient = new Pool({
    connectionString: config.database.postgres.url,
  });

  const db = drizzle(seedClient);

  const skiilPoolData: InferInsertSkillPool[] = [];
  const questionPoolData: InferInsertQuestionPool[] = [];
  const categoryQuestionPoolData: InferInsertCategoryQuestionPool[] = [];

  const professions = {
    backend: {
      skills: [
        {
          skill: 'Знание архитектуры серверных приложений',
          question:
            'Как бы вы организовали структуру приложения для обработки миллионов запросов в секунду? Какие паттерны и технологии использовали бы для обеспечения масштабируемости и отказоустойчивости?',
        },
        {
          skill: 'Опыт работы с базами данных',
          question:
            'Как бы вы оптимизировали запрос, который работает медленно на больших объёмах данных в реляционной базе данных? Как бы вы подходили к индексации, нормализации и денормализации?',
        },
        {
          skill: 'Знание принципов безопасности',
          question:
            'Какие меры безопасности вы бы применили для защиты REST API от SQL-инъекций и XSS-атак? Какие практики безопасности следует использовать при работе с пользовательскими данными?',
        },
      ],
      categoryId: 1,
    },
    frontend: {
      skills: [
        {
          skill: 'Работа с UI/UX',
          question:
            'Как бы вы улучшили пользовательский интерфейс страницы с таблицей данных, чтобы сделать его более интуитивно понятным и удобным для пользователей, не имеющих технического образования?',
        },
        {
          skill: 'Знание адаптивного дизайна',
          question:
            'Как бы вы реализовали адаптивность веб-страницы, чтобы она корректно отображалась на различных устройствах, от мобильных до десктопов, с учётом разных экранов и ориентаций?',
        },
        {
          skill: 'Опыт работы с JavaScript и фреймворками',
          question:
            'Как бы вы реализовали динамическое добавление контента на страницу с использованием JavaScript? Какие фреймворки вы бы использовали для упрощения этого процесса и почему?',
        },
      ],
      categoryId: 2,
    },
    ui_ux: {
      skills: [
        {
          skill: 'Разработка прототипов',
          question:
            'Как вы разрабатываете первые прототипы для нового веб-приложения? Какие инструменты и методологии вы используете для создания и тестирования макетов?',
        },
        {
          skill: 'Исследование пользователей',
          question:
            'Как бы вы организовали исследование целевой аудитории для нового приложения, чтобы понять их потребности и предпочтения в дизайне? Какие методы исследования вы предпочли бы?',
        },
        {
          skill: 'Понимание взаимодействия с пользователем',
          question:
            'Как бы вы улучшили пользовательский опыт для формы регистрации, чтобы сделать её максимально понятной и удобной для пользователей?',
        },
      ],
      categoryId: 3,
    },
    system_analyst: {
      skills: [
        {
          skill: 'Сбор и анализ требований',
          question:
            'Как бы вы подходили к сбору требований для нового проекта, чтобы гарантировать, что все ключевые бизнес-цели будут учтены и правильно интерпретированы?',
        },
        {
          skill: 'Разработка технической документации',
          question:
            'Какие инструменты и подходы вы используете для создания документации по техническим требованиям и архитектуре системы? Какую информацию следует в первую очередь включать в такие документы?',
        },
        {
          skill: 'Управление проектными рисками',
          question:
            'Как бы вы оценивали риски, связанные с проектом? Как бы вы подходили к управлению рисками на разных стадиях жизненного цикла проекта?',
        },
      ],
      categoryId: 4,
    },
  };

  // Generate skill and question data
  for (const [profession, { skills, categoryId }] of Object.entries(
    professions
  )) {
    for (const { skill, question } of skills) {
      const skillUid = v4();
      skiilPoolData.push({ uid: skillUid, name: skill });

      questionPoolData.push({
        question,
        answers: [],
        skillUid,
      });
    }
  }

  const categoryData = {
    backend: 1,
    frontend: 2,
    uiux: 3,
    system_analyst: 4,
  };

  for (const [category, questions] of Object.entries(dataFromFile)) {
    const categoryId = categoryData[category];
    for (const { question, options } of questions) {
      categoryQuestionPoolData.push({
        question,
        answers: options.map((option: string) => ({ body: option })),
        categoryId,
      });
    }
  }
  // console.log(skiilPoolData, questionPoolData, categoryQuestionPoolData);

  if ((await db.select().from(skillPool)).length === 0) {
    await db.insert(skillPool).values(skiilPoolData);
  }
  if ((await db.select().from(questionPool)).length === 0) {
    await db.insert(questionPool).values(questionPoolData);
  }
  if ((await db.select().from(categoryQuestions)).length === 0) {
    await db.insert(categoryQuestions).values(categoryQuestionPoolData);
  }
};

seed();
