import type { z } from "zod";

import { Button, Input } from "@shared/ui";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@shared/ui/form";

import type { editFileFormSheme } from "../lib/editFileFormSheme";
import { useEditFileForm } from "../model/useEditFileForm";
import { useUpdateFileName } from "../model/useUpdateFileName";

interface IEditFileFormProps {
  name: string;
  uid: string;
}

export const EditFileForm = ({ name, uid }: IEditFileFormProps) => {
  const editFileForm = useEditFileForm(name);
  const { updateFileName } = useUpdateFileName();

  const updateFile = (data: z.infer<typeof editFileFormSheme>) => updateFileName(data, uid);

  return (
    <Form {...editFileForm}>
      <form
        onSubmit={editFileForm.handleSubmit(updateFile)}
        className='flex items-center justify-center flex-col gap-7'
      >
        <FormField
          control={editFileForm.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='leading-[143%] font-medium text-slate-900 text-base'>
                Название
              </FormLabel>
              <FormControl>
                <Input placeholder='Введите название документа' className='h-10' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button size='lg' disabled={!editFileForm.formState.isValid}>
          Сохранить
        </Button>
      </form>
    </Form>
  );
};
