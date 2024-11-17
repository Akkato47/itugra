import { useState } from "react";

import { LoadingIcon } from "@shared/icons";
import { cn } from "@shared/lib/shade-cn";
import { Button, Input, Label } from "@shared/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { RadioGroup, RadioGroupItem } from "@shared/ui/radio-group";

import type { Quest } from "../api/req";
import { useAnswers } from "../model/answers";
import { useStage } from "../model/stage";

interface QuestCardProps {
  question: Quest;
}

export const QuestCardSelect = ({ question }: QuestCardProps) => {
  const { answers, setAnswers } = useAnswers();
  const [value, setValue] = useState(
    answers.find((answer) => answer.question === question.questionBody)?.answer
  );

  function onValueChange(val: string) {
    setValue(val);
    const oldAnswers = answers.filter((answer) => answer.question !== question.questionBody);
    const newAnswers = [...oldAnswers, { answer: val, question: question.questionBody }];
    setAnswers(newAnswers);
  }

  const { stage, setStage } = useStage();

  function onClickBackBtn() {
    setStage(stage - 1);
  }

  function onClickNextBtn() {
    setStage(stage + 1);
  }

  return (
    <>
      <Card className='w-full'>
        <CardHeader>
          <CardTitle className='text-foreground'>{question.questionBody}</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup asChild defaultValue={value} onValueChange={(val) => onValueChange(val)}>
            <ul className='flex list-none flex-col space-y-1'>
              {question &&
                question.answers.map((option) => (
                  <li
                    key={option.body}
                    className={cn(
                      "flex items-center space-x-2 rounded-lg bg-background p-4 ",
                      value === option.body && "outline outline-2 outline-offset-2 outline-primary"
                    )}
                  >
                    <RadioGroupItem value={option.body} id={option.body} />
                    <Label htmlFor={option.body}>{option.body}</Label>
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
          disabled={stage === 1}
          onClick={onClickBackBtn}
        >
          Назад
        </Button>
        <Button className='w-full' disabled={Boolean(!value)} onClick={onClickNextBtn}>
          Далее
        </Button>
      </div>
    </>
  );
};

export const QuestCardInput = ({ question }: QuestCardProps) => {
  const { answers, setAnswers } = useAnswers();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(
    answers.find((answer) => answer.question === question.questionBody)?.answer ?? ""
  );

  function onValueChange(val: string) {
    setValue(val);
    const oldAnswers = answers.filter((answer) => answer.question !== question.questionBody);
    const newAnswers = [...oldAnswers, { answer: val, question: question.questionBody }];
    setAnswers(newAnswers);
  }

  const { stage, setStage } = useStage();

  function onClickBackBtn() {
    setStage(stage - 1);
  }

  async function onClickNextBtn() {
    if (stage === length) {
      setLoading(true);
    } else {
      setStage(stage + 1);
    }
  }

  return (
    <>
      <Card className='w-full'>
        <CardHeader>
          <CardTitle className='text-foreground'>{question.questionBody}</CardTitle>
        </CardHeader>
        <CardContent>
          <Input className='w-full' value={value} onChange={(e) => onValueChange(e.target.value)} />
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
