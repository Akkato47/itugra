import { useMemo, useState } from "react";

import { type Stage, StageContext } from "./StageContext";

export interface StageProviderProps {
  children: React.ReactNode;
}

export const StageProvider = ({ children }: StageProviderProps) => {
  const [stage, setStage] = useState<Stage>(0);

  const value = useMemo(() => ({ stage, setStage }), [stage]);

  return <StageContext.Provider value={value}>{children}</StageContext.Provider>;
};
