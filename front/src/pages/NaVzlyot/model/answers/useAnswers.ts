import { useContext } from "react";

import { AnswersContext } from "./AnswersContext";

export const useAnswers = () => useContext(AnswersContext);
