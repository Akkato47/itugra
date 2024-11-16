import { EventCard } from "@entities/event";

import { paths } from "@shared/constants/react-router";

const AdminRequestsHistoryPage = () => (
  <section className='space-y-6'>
    {Array.from({ length: 6 }).map((_, index) => (
      <EventCard redirectUrl={paths.ADMIN} key={index} />
    ))}
  </section>
);

export default AdminRequestsHistoryPage;
