import type { z } from "zod";

import { ETeamType } from "@entities/team";

import { Button, Input } from "@shared/ui";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@shared/ui/form";

import { usePostCreateTeamMutation } from "../api/usePostCreateTeamMutation";
import type { createTeamFormSchema } from "../lib/createTeamFormSchema";
import { useCreateTeamForm } from "../model/useCreateTeamForm";

interface ICreateTeamFormProps {
  children: React.ReactNode;
}

export const CreateTeamForm = ({ children }: ICreateTeamFormProps) => {
  const createTeamForm = useCreateTeamForm();
  const { mutateAsync } = usePostCreateTeamMutation({
    options: {
      onSuccess(data) {
        console.log(data);
      }
    }
  });

  const createTeam = async (data: z.infer<typeof createTeamFormSchema>) => {
    await mutateAsync({
      params: {
        name: data.name,
        type: ETeamType.PERMANENT
      }
    });
  };

  return (
    <Form {...createTeamForm}>
      <form
        onSubmit={createTeamForm.handleSubmit(createTeam)}
        className='flex flex-col justify-center gap-7 mt-5'
      >
        <FormField
          control={createTeamForm.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold text-black'>Название команды</FormLabel>
              <FormControl>
                <Input
                  autoComplete='off'
                  type='text'
                  placeholder='Введите название команды'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex items-center gap-4 justify-end mt-4'>
          {children}
          <Button disabled={!createTeamForm.formState.dirtyFields.name}>Создать команду</Button>
        </div>
      </form>
    </Form>
  );
};
