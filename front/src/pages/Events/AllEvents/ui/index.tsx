import { EventCard } from "@entities/event";

import { paths } from "@shared/constants/react-router";

const AllEventsPage = () => {
  console.log("f");

  return (
    <div className=''>
      {Array.from({ length: 6 }).map((_, index) => (
        <EventCard redirectUrl={paths.PROFILE + "/" + paths.EVENT} key={index} />
      ))}
    </div>
  );
};

export default AllEventsPage;
