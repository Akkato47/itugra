import { EditExperience } from "@widgets/edit-profile";

import { AddExperienceForm } from "@features/edit-profile";

import { useGetUserExperience } from "@entities/user";

import { Button, Heading } from "@shared/ui";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@shared/ui/dialog";

const WorkSettingsPage = () => {
  const { data, isSuccess } = useGetUserExperience({});

  return (
    <section className='w-full max-w-[840px] flex flex-col items-center rounded-lg border border-slate-300'>
      <div className='w-full my-10 text-center px-6 space-y-10'>
        <Heading variant='h2' tag='h2'>
          Опыт работы
        </Heading>
        <div className='mt-4 space-y-6'>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant='ghost'
                className='border border-dashed border-slate-400 opacity-70 w-full py-7'
              >
                <Heading variant='h4' tag='h4'>
                  {" "}
                  + Добавить опыт работы
                </Heading>
              </Button>
            </DialogTrigger>
            <DialogContent aria-describedby={undefined}>
              <DialogHeader>
                <DialogTitle>Место работы</DialogTitle>
              </DialogHeader>
              <AddExperienceForm userExperience={null} />
            </DialogContent>
          </Dialog>
          {isSuccess && (
            <div className='space-y-4 text-center'>
              <EditExperience userExperience={data.data.userExperience} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default WorkSettingsPage;
