import { Button, Heading } from "@shared/ui";
import { Card } from "@shared/ui/card";
import { Progress } from "@shared/ui/progress";

import { useStage } from "../model/stage";
import { QuestCard } from "./QuestCard";

export const NaVzlyotContainer = ({ questions }: { questions: QuestionWithOptions[] }) => {
  const { stage, setStage } = useStage();

  return (
    <main className='container flex h-s-minus-navbar flex-col items-center justify-center'>
      <div className='flex w-full max-w-lg flex-col items-center justify-center gap-5 '>
        {stage === 0 && (
          <Card className='flex flex-col gap-5 px-4 py-10 text-center'>
            <Heading tag='h2'>На взлёт!</Heading>
            <p>
              Этот тест предназначен для оценки ваших навыков и знаний в выбранной области. Вопросы
              охватывают ключевые аспекты работы в вашей профессии, и помогут выявить ваши сильные
              стороны, а также области для дальнейшего развития.
              <br />
              Пройдите тест честно и не торопитесь, чтобы продемонстрировать ваш реальный уровень
              знаний. По окончании вы получите рекомендации и информацию, которая может быть полезна
              для вашего профессионального роста.
            </p>
            <Button onClick={() => setStage(1)}>Начать тестирование</Button>
          </Card>
        )}
        {stage !== 0 && (
          <>
            <Progress max={questions.length} value={stage} />
            <span className='text-base font-semibold'>
              {stage} из {questions.length}
            </span>
            <QuestCard key={stage} question={questions[stage - 1]} />
          </>
        )}
      </div>
    </main>
  );
};
