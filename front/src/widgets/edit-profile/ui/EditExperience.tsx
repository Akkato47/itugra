import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";

import { UpdateExperienceForm } from "@features/edit-profile";

import { type IUserExperience } from "@entities/user";

import { formateDate } from "@shared/lib/formateDate";
import { Button, Heading } from "@shared/ui";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@shared/ui/dialog";

import { useDeleteExperienceMutation } from "../api/hooks/useDeleteExperienceMutation";

interface IEditExperienceProps {
  userExperience: IUserExperience[];
}

export const EditExperience = ({ userExperience }: IEditExperienceProps) => {
  const { mutate } = useDeleteExperienceMutation();

  const deleteProfileExperience = (uid: string) => {
    mutate({
      uid: uid
    });
  };

  return (
    <>
      {userExperience.length !== 0 && (
        <ul className='mt-4 space-y-3 border border-slate-300 rounded-lg p-6'>
          {userExperience.map((career) => (
            <li key={career.uid} className='gap-1 flex flex-col items-start relative'>
              <Heading variant='h4' tag='h4'>
                {career.position}
              </Heading>
              <p className='text-[#0066b3] leading-[175%]'>{career.name}</p>
              <p className='text-sm leading-[171%] opacity-50'>{`${formateDate(career.startDate, "dote")} - ${career.present ? "По настоящее время" : formateDate(career.endDate, "dote")}`}</p>
              <div className='absolute flex items-center gap-3 top-1/2 -translate-y-1/2 right-0'>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant='ghost' size='icon'>
                      <Pencil1Icon className='size-6' />
                    </Button>
                  </DialogTrigger>
                  <DialogContent aria-describedby={undefined}>
                    <DialogHeader>
                      <DialogTitle>Редактировать место работы</DialogTitle>
                    </DialogHeader>
                    <UpdateExperienceForm userExperience={career} />
                  </DialogContent>
                </Dialog>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => deleteProfileExperience(career.uid)}
                >
                  <TrashIcon className='size-6 hover:text-red-700' />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
