import { PatternFormat } from "react-number-format";
import type { z } from "zod";

import type { IUserExperience } from "@entities/user";

import { formateDate } from "@shared/lib/formateDate";
import { Button, Checkbox, Input } from "@shared/ui";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@shared/ui/form";

import type { editExperienceFormShema } from "../lib/editExperienceFormSchema";
import { useEditExperienceForm } from "../model/useEditExperienceForm";
import { useUpdateExperiens } from "../model/useUpdateExperiens";

interface IUpdateExperienceFormProps {
  userExperience: IUserExperience;
}

export const UpdateExperienceForm = ({ userExperience }: IUpdateExperienceFormProps) => {
  const { updateExperience } = useUpdateExperiens();
  const editExperienceForm = useEditExperienceForm({
    ...userExperience,
    startDate: formateDate(userExperience.startDate, "dote"),
    endDate: userExperience.endDate ? formateDate(userExperience.endDate, "dote") : ""
  });

  const present = editExperienceForm.watch("present");
  const endDate = editExperienceForm.watch("endDate");

  const updateUserExperience = (data: z.infer<typeof editExperienceFormShema>) => {
    if (!data.endDate && !data.present) {
      editExperienceForm.setError("present", {
        message: "Выберите вариант окончания",
        type: "validate"
      });
      return;
    }

    if (data.endDate) {
      updateExperience(
        {
          ...data,
          startDate: formateDate(data.startDate, "dash"),
          endDate: formateDate(data.endDate, "dash")
        },
        userExperience.uid
      );
    } else {
      const omitEndDate: any = Object.fromEntries(
        Object.entries(data).filter(([, value]) => value !== data.endDate)
      );
      updateExperience(
        {
          ...omitEndDate,
          startDate: formateDate(data.startDate, "dash")
        },
        userExperience.uid
      );
    }
  };

  return (
    <Form {...editExperienceForm}>
      <form
        onSubmit={editExperienceForm.handleSubmit(updateUserExperience)}
        className='flex flex-col items-center justify-center gap-7 mt-5'
      >
        <FormField
          control={editExperienceForm.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold'>Название организации</FormLabel>
              <FormControl>
                <Input
                  className='w-[320px]'
                  type='text'
                  placeholder='Введите название организации'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={editExperienceForm.control}
          name='position'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold'>Должность</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  className='w-[320px]'
                  placeholder='Введите вашу должность'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='space-y-2'>
          <FormLabel className='font-bold text-black'>Время работы</FormLabel>
          <div className='grid grid-cols-[1fr_1fr] grid-rows-2 justify-end'>
            <FormField
              control={editExperienceForm.control}
              name='startDate'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type='text'
                      className='w-[152px]'
                      placeholder='01.01.2000'
                      format='##.##.####'
                      mask='_'
                      component={PatternFormat}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='ml-0' />
                </FormItem>
              )}
            />
            <FormField
              control={editExperienceForm.control}
              name='endDate'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type='text'
                      className='w-[152px]'
                      placeholder='01.01.2000'
                      disabled={present}
                      format='##.##.####'
                      mask='_'
                      component={PatternFormat}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='ml-0' />
                </FormItem>
              )}
            />
            <div className='' />
            <FormField
              control={editExperienceForm.control}
              name='present'
              render={({ field }) => (
                <FormItem>
                  <div className='flex items-center gap-2 mt-7'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        disabled={!!endDate}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className='text-black'>По настоящее время</FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button size='lg' disabled={!editExperienceForm.formState.isDirty}>
          Сохранить
        </Button>
      </form>
    </Form>
  );
};
