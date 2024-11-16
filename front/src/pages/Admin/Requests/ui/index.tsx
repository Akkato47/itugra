import { EventCard } from "@entities/event";

const AdminRequestsPage = () => (
  <section className='space-y-6'>
    {Array.from({ length: 6 }).map((_, index) => (
      <EventCard key={index} />
    ))}
  </section>
);

export default AdminRequestsPage;
