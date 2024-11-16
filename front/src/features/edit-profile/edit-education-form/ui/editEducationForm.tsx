import { PatternFormat } from "react-number-format";
import type { z } from "zod";

import type { IUserEducation } from "@entities/user";

import { Button, Input } from "@shared/ui";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@shared/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/ui/select";

import type { editEducationFormShema } from "../lib/editEducationFormShema";
import { useEditEducationForm } from "../model/useEditEducationForm";
import { useUpdateEducation } from "../model/useUpdateEducation";

interface IEditEducationFormProps {
  education: IUserEducation | null;
}

export const EditEducationForm = ({ education }: IEditEducationFormProps) => {
  const editEducationForm = useEditEducationForm(education);
  const { updateEducation } = useUpdateEducation();

  const updateUserEducation = (data: z.infer<typeof editEducationFormShema>) => {
    updateEducation(data);
  };

  return (
    <Form {...editEducationForm}>
      <form
        onSubmit={editEducationForm.handleSubmit(updateUserEducation)}
        className='flex flex-col items-center justify-center gap-8 mt-5'
      >
        <FormField
          control={editEducationForm.control}
          name='university'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold text-black'>Учреждение</FormLabel>
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
          control={editEducationForm.control}
          name='direction'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold text-black'>Специальность</FormLabel>
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
        <FormField
          control={editEducationForm.control}
          name='educationPeriod'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold text-black'>Период обучения</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  className='w-[320px]'
                  format='##.##.####-##.##.####'
                  mask='_'
                  component={PatternFormat}
                  placeholder='01.01.2000 - 01.01.2004'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={editEducationForm.control}
          name='format'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold text-black'>Форма обучения</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='w-[320px] h-[45px]'>
                    <SelectValue placeholder='Выберите формат обучения' />
                  </SelectTrigger>
                </FormControl>
                <FormMessage />
                <SelectContent>
                  <SelectItem value='FULL'>Очная</SelectItem>
                  <SelectItem value='DIST'>Заочная</SelectItem>
                  <SelectItem value='PART'>Очно-заочная</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Button size='lg' className='mt-2' disabled={!editEducationForm.formState.isDirty}>
          Сохранить
        </Button>
      </form>
    </Form>
  );
};
