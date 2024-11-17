import { useState } from "react";

import type { NumCategory } from "@pages/NaVzlyot/api/req";

import { Button, Heading } from "@shared/ui";
import { Card } from "@shared/ui/card";
import { Progress } from "@shared/ui/progress";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@shared/ui/select";

import { usePostGenerateTestingMutation } from "../api/hooks";
import { useAnswers } from "../model/answers";
import { useStage } from "../model/stage";
import { QuestCardInput, QuestCardSelect } from "./QuestCard";
import { SelectSkillsForPage } from "./SelectSkillsForPage";

type Category = "1" | "2" | "3" | "4";

export const NaVzlyotContainer = () => {
  const { stage, setStage } = useStage();
  const { answers } = useAnswers();
  const [category, setCategory] = useState<Category | undefined>();

  const questionsMutation = usePostGenerateTestingMutation({
    options: {
      onSuccess: () => {
        setStage(1);
      }
    }
  });

  const quests = questionsMutation.data?.data;

  return (
    <main className='container flex h-s-minus-navbar flex-col items-center justify-center'>
      <div className='flex w-full max-w-lg flex-col items-center justify-center gap-5 '>
        {stage === 0 && (
          <Card className='flex flex-col gap-5 px-4 py-10 text-center'>
            <Heading tag='h1'>На взлёт!</Heading>
            <p>
              Этот опрос предназначен для оценки ваших навыков и знаний в выбранной области. Вопросы
              охватывают ключевые аспекты работы в вашей профессии, и помогут выявить ваши сильные
              стороны, а также области для дальнейшего развития.
              <br />
              Пройдите тест честно и не торопитесь, чтобы продемонстрировать ваш реальный уровень
              знаний. По окончании вы получите рекомендации и информацию, которая может быть полезна
              для вашего профессионального роста.
            </p>

            <Select defaultValue={category} onValueChange={(e) => setCategory(e as Category)}>
              <SelectTrigger className='w-[180px] '>
                <SelectValue placeholder='Выберите категорию' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value='1'>Backend</SelectItem>
                  <SelectItem value='2'>Frontend</SelectItem>
                  <SelectItem value='3'>UI/UX</SelectItem>
                  <SelectItem value='4'>Системная аналитика</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Button
              disabled={!category}
              onClick={() =>
                questionsMutation.mutateAsync({
                  params: { category: Number(category) as NumCategory }
                })
              }
            >
              Начать тестирование
            </Button>
          </Card>
        )}

        {stage !== 0 && stage !== Number(quests?.length) + 1 && quests && (
          <>
            <Progress value={Number((answers.length / quests.length).toFixed(2)) * 100} />
            <span className='text-base font-semibold'>
              {stage} из {quests.length}
            </span>

            {quests[stage - 1].answers.length > 0 ? (
              <QuestCardSelect key={stage} question={quests[stage - 1]} />
            ) : (
              <QuestCardInput key={stage} question={quests[stage - 1]} />
            )}
          </>
        )}

        {stage === Number(quests?.length) + 1 && (
          <Card className='flex flex-col gap-5 px-4 py-10 text-center'>
            <Heading tag='h2'>Молодец!</Heading>
            <p>А теперь выбери навыки в которых бы ты хотел прокачаться.</p>

            <SelectSkillsForPage chosenCategory={Number(category ?? 1)} />
          </Card>
        )}
      </div>
    </main>
  );
};
