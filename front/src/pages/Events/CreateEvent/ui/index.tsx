import { CreateEventRequestForm } from "@features/create-event-request";

const CreateEventPage = () => (
  <section className='border border-slate-300 rounded-xl space-y-10'>
    <div className='px-10 py-5'>
      <CreateEventRequestForm />
    </div>
  </section>
);

export default CreateEventPage;
