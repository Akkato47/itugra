import { useGetRoadmapQuery } from "../api/hooks";
import { CheckList } from "./CheckList";
import { NaVzlyotContainer } from "./NaVzlyotContainer";
import { NaVzlyotProviders } from "./NaVzlyotProviders";

const NaVzlyotPage = () => {
  const roadmapQuery = useGetRoadmapQuery({});

  if (roadmapQuery.data?.data) {
    return <CheckList list={roadmapQuery.data?.data} />;
  }

  return (
    <NaVzlyotProviders>
      <NaVzlyotContainer />
    </NaVzlyotProviders>
  );
};

export default NaVzlyotPage;
