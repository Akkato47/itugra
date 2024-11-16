import { createContext } from 'react';

export type Stage = number;

export interface StageContextProps {
  stage: Stage;
  setStage: (stage: number) => void;
}

export const StageContext = createContext<StageContextProps>({
  stage: 0,
  setStage: () => {}
});
