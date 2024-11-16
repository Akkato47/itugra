import { useState } from "react";

import { LoadingIcon } from "@shared/icons";
import { cn } from "@shared/lib/shade-cn";
import { Button, Label } from "@shared/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { RadioGroup, RadioGroupItem } from "@shared/ui/radio-group";

import { useAnswers } from "../model/answers";
import { useStage } from "../model/stage";

interface QuestCardProps {
  question: QuestionWithOptions;
}

export const QuestCard = ({ question }: QuestCardProps) => {
  const { answers, setAnswers } = useAnswers();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(
    answers.find((answer) => answer.order === question.order)?.optionId
  );

  function onValueChange(val: string) {
    setValue(val);
    const oldAnswers = answers.filter((answer) => answer.order !== question.order);
    const newAnswers = [...oldAnswers, { order: question.order, optionId: val }];
    setAnswers(newAnswers);
  }

  const { stage, setStage } = useStage();

  function onClickBackBtn() {
    setStage(stage - 1);
  }

  async function onClickNextBtn() {
    if (stage === 5) {
      setLoading(true);
    } else {
      setStage(stage + 1);
    }
  }

  return (
    <>
      <Card className='w-full'>
        <CardHeader>
          <CardTitle className='text-foreground'>{question.body}</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup asChild defaultValue={value} onValueChange={(val) => onValueChange(val)}>
            <ul className='flex list-none flex-col space-y-1'>
              {question &&
                question.options.map((option) => (
                  <li
                    key={option.id}
                    className={cn(
                      "flex items-center space-x-2 rounded-lg bg-background p-4 ",
                      value === option.id && "outline outline-2 outline-offset-2 outline-primary"
                    )}
                  >
                    <RadioGroupItem value={option.id} id={option.id} />
                    <Label htmlFor={option.id}>{option.label}</Label>
                  </li>
                ))}
            </ul>
          </RadioGroup>
        </CardContent>
      </Card>
      <div className='grid w-full grid-cols-2 gap-5'>
        <Button
          className='w-full'
          variant='outline'
          disabled={stage === 1 || loading}
          onClick={onClickBackBtn}
        >
          Назад
        </Button>
        <Button className='w-full' disabled={Boolean(!value) || loading} onClick={onClickNextBtn}>
          {loading && <LoadingIcon className='mr-2 size-4' />}
          Далее
        </Button>
      </div>
    </>
  );
};
