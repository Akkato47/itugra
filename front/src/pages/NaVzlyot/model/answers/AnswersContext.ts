import { createContext } from "react";

export interface Answer {
  question: string;
  answer: string;
}

export interface AnswersContextProps {
  answers: Answer[];
  setAnswers: ((answers: Answer[]) => void) | (() => Answer[]);
}

export const AnswersContext = createContext<AnswersContextProps>({
  answers: [],
  setAnswers: () => null
});
