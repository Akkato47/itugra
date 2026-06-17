import { CreateEventRequestForm } from "@features/create-event-request";

const CreateEventPage = () => (
  <section className='border border-border rounded-xl space-y-10'>
    <div className='px-10 py-5'>
      <CreateEventRequestForm />
    </div>
  </section>
);

export default CreateEventPage;
