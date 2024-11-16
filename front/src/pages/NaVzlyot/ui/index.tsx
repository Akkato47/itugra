import { NaVzlyotContainer } from "./NaVzlyotContainer";
import { NaVzlyotProviders } from "./NaVzlyotProviders";

const NaVzlyotPage = () => {
  const questions = [undefined, undefined];

  return (
    <NaVzlyotProviders>
      <NaVzlyotContainer questions={questions} />
    </NaVzlyotProviders>
  );
};

export default NaVzlyotPage;
