import { Pencil1Icon } from "@radix-ui/react-icons";

import { EditProfileFiles } from "@widgets/edit-profile";

import { EditEducationForm } from "@features/edit-profile";

import { useGetUserEducation } from "@entities/user";

import { Button, Heading } from "@shared/ui";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@shared/ui/dialog";

const EducationSettingsPage = () => {
  const { data, isSuccess } = useGetUserEducation({});

  return (
    <>
      {isSuccess && (
        <section className='w-full max-w-[840px] flex flex-col items-center rounded-lg border border-slate-300'>
          <div className='w-full space-y-7 px-6 relative my-6'>
            <Heading variant='h3' tag='h3' className='text-center'>
              Образование
            </Heading>
            {data.data.userEducation !== null && (
              <div className='flex items-center justify-center gap-4'>
                <div className='bg-red-600 flex-shrink-0 size-6 rounded-full' />
                <p className='leading-[175%]'>{`Учреждение: ${data.data.userEducation.university}. Специальность: ${data.data.userEducation.direction}. Год окончания: ${data.data.userEducation.endDate.slice(0, 4)}. Форма обучения: ${data.data.userEducation.format}`}</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant='ghost' size='icon'>
                      <Pencil1Icon className='size-5' />
                    </Button>
                  </DialogTrigger>
                  <DialogContent aria-describedby={undefined}>
                    <DialogHeader>
                      <DialogTitle>Образование</DialogTitle>
                    </DialogHeader>
                    <EditEducationForm education={data.data.userEducation} />
                  </DialogContent>
                </Dialog>
              </div>
            )}
            {data.data.userEducation === null && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant='ghost'
                    className='border border-dashed border-slate-400 opacity-70 w-full py-7'
                  >
                    <Heading variant='h4' tag='h4'>
                      {" "}
                      + Добавить образование
                    </Heading>
                  </Button>
                </DialogTrigger>
                <DialogContent aria-describedby={undefined}>
                  <DialogHeader>
                    <DialogTitle>Образование</DialogTitle>
                  </DialogHeader>
                  <EditEducationForm education={data.data.userEducation} />
                </DialogContent>
              </Dialog>
            )}

            <EditProfileFiles files={data.data.files} />
          </div>
        </section>
      )}
    </>
  );
};

export default EducationSettingsPage;
