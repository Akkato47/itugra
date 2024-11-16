import { AnswersProvider } from "../model/answers";
import { StageProvider } from "../model/stage";

interface ProfTestProvidersProps {
  children: React.ReactNode;
}

export const NaVzlyotProviders = ({ children }: ProfTestProvidersProps) => (
  <StageProvider>
    <AnswersProvider>{children}</AnswersProvider>
  </StageProvider>
);
