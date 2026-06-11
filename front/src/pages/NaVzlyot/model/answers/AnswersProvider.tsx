import { useMemo, useState } from "react";

import type { Answer } from "./AnswersContext";
import { AnswersContext } from "./AnswersContext";

export interface AnswersProviderProps {
  children: React.ReactNode;
}

export const AnswersProvider = ({ children }: AnswersProviderProps) => {
  const [answers, setAnswers] = useState<Answer[]>([]);

  const value = useMemo(() => ({ answers, setAnswers }), [answers]);

  return <AnswersContext.Provider value={value}>{children}</AnswersContext.Provider>;
};
